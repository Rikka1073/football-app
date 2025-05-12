import { Button } from "@yamada-ui/react";
import "./App.css";
import axios from "axios";

function App() {
  // axios
  //   .get("/api/v4/competitions/PL/teams", {
  //     headers: {
  //       "X-Auth-Token": import.meta.env.VITE_API_KEY,
  //     },
  //   })
  //   .then((res) => {
  //     console.log(res.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return (
    <>
      <Button>ボタン</Button>
    </>
  );
}

export default App;
