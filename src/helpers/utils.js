import _ from 'underscore';


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
    "Manage Account": [
        {
            page: "Personal Details",
            component: null,
        },
        {
            page: "Address Managment",
            component: null,
        },
        {
            page: "PAN Information",
            component: null
        }
    ]
    ,
    "Your Orders": null,
    "Manage Payments": [
        {
            page: "Saved Cards",
            component: null,
        },
        {
            page: "Gift Cards",
            component: null
        },
    ],
    "My Section": [
        {
            page: "Given Reviews",
            component: null
        },
        {
            page: "Wishlist",
            component: null,
        }
    ],
    "Sign Out": null

}