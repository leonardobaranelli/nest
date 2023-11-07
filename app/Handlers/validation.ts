import React from "react";
import { Values } from "../Views/FormCreate/page";

const validate = (input:Values)=> {
    
  let errors= {
    days: "",
    condition: "",
    type:"",
    images: [],
    title: "",
    country: "",
    city: "",
    streetName: "",
    streetNumber: "",
    floorNumber: "",
    aptNumber: "",
    price: "",
    description: "",
  };
    const regexImage = /\.(jpg|jpeg|png|gif)$/i;

    if (!input.title) {
    errors.title = "Title is required";
    }

    if (input.title.length > 50) {
    errors.title = "Should be less than 50 characters";
    }

    if (!input.type) {
    errors.type = "Condition is required";
    }

    
    if (!input.days) {
        errors.days = "Days should be greater than 0";
        }

    if (Number(input.days) > 31) {
        errors.days = "Days should be less than a month";
        }
        


    if (!input.country) {
    errors.country = "Country is required";
    }

    if (!input.city) {
    errors.city = "City is required";
    }

    if (!input.streetName) {
    errors.streetName = "Street is required";
    }

    if (!input.streetNumber) {
    errors.streetNumber = "Street Number is required";
    }

    if (!input.price || input.price <= 0) {
    errors.price = "Price should be greater than 0";
    }

    if (!input.description) {
    errors.description = "Description is required";
    }
//if (!/^[0-9]*$/.test(input.floorNumber)) {
//  errors.floorNumber = "Only numbers are allowed";
//}

  //  if (!/^([0-9])*$/.test(input.aptNumber)) {
  //  errors.aptNumber = "Only numbers are allowed";
  // }

    // Handle image validation
    //if (!input.images) {
      //  errors.images = "Image is required";
    //} else if (!regexImage.test(input.images.name)) {
    //errors.images = "Invalid image format. Upload a valid image file.";
    //}
    

    return errors;
};

export default validate;
