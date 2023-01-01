import _ from 'underscore';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PaymentIcon from '@mui/icons-material/Payment';
import WindowIcon from '@mui/icons-material/Window';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonalDetails from "./../sidebardetails/PersonalDetails";
import AddressManagement from "./../sidebardetails/AddressManagement";
import GiftCards from "./../sidebardetails/GiftCards";
import GivenReviews from "./../sidebardetails/GivenReviews";
import PanInformation from "./../sidebardetails/PanInformation";
import SavedCards from "./../sidebardetails/SavedCards";
import WishList from "./../sidebardetails/WishList";
import BecomeSeller from "./../sidebardetails/BecomeSeller";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { Box } from '@mui/material';


export const object_in_array = (object, array) => {
    console.log("array", array);
    const fil = array.filter((x) => _.isEqual(_.omit(x, "id"), object));

    if (fil.length > 0) {
        return [true, fil[0]];
    }
    return [false, object];
}

export const index_object_array = (array, seachProperty, propertyVal) => {
    const temp = array.map(e => e[seachProperty]);
    return temp.indexOf(propertyVal);
}

export const sidebarDetails = {
    "Manage Account": {
        "content": [
            {
                page: "Personal Details",
                component: PersonalDetails,
            },
            {
                page: "Address Managment",
                component: AddressManagement,
            },
            {
                page: "PAN Information",
                component: PanInformation
            }
        ],
        "icon": ManageAccountsIcon
    }
    ,
    "Your Orders": {
        "content": null,
        "icon": ShoppingBagIcon
    },
    "Manage Payments": {
        "content": [
            {
                page: "Saved Cards",
                component: SavedCards,
            },
            {
                page: "Gift Cards",
                component: GiftCards
            },
        ],
        "icon": PaymentIcon
    },
    "My Section": {
        "content": [
            {
                page: "Given Reviews",
                component: GivenReviews
            },
            {
                page: "Wishlist",
                component: WishList,
            },
            {
                page: "Become a Seller",
                component: BecomeSeller,
            }
        ],
        "icon": WindowIcon
    },
    "Sign Out": {
        "content": null,
        "icon": LogoutIcon
    }

}

export const range = (start, end) => {
    if(start === end) return [start];
    return [start, ...range(start + 1, end)];
}

export const ToastCloseButton = ({ closeToast }) => {

    return (
        <Box 
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
            onClick={closeToast}
        >
            <CancelRoundedIcon color="secondary"/>
        </Box>
    )
}