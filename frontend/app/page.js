import Image from "next/image";
import Navbar from "./components/Navbar";
import Folder from "./pages/Folder";
import Upload from "./pages/upload";

export default function Home() {
  return (
    <>
      <Navbar />
      <Folder />
      <Upload />
    </>
  );
}
