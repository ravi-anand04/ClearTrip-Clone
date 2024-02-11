import { ListGroup } from "flowbite-react";

const getCurrentDate = () => {
  const currentDate = new Date();

  // Extract year, month, and day
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Add 1 to month since January is 0
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Format date as yyyy-mm-dd
  const formattedDate = `${year}-${month}-${day}`;
  console.log("Hey three", formattedDate);
  return formattedDate;
};

export default getCurrentDate;
