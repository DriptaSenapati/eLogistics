import { Box } from "@mui/material";
import { useSession } from "next-auth/react";



export default function Home() {
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  //     var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  //     var body = document.querySelector("body")
  //     body.style.width = w;
  //     body.style.height = h;
  //   }

  // }, [])
  const { data: session } = useSession();
  console.log(session)
  return (
    <Box>
      {
        session ? `Hi There, ${session.user.name}` : 'Hi There'
      }
    </Box>
  )
}
