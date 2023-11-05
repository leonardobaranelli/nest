const validate = (input) => {
    let errors = {};
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

    
    if (!input.days || input.days <= 0) {
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
    //if (!input.image) {
      //  errors.image = "Image is required";
        //}

    // Add more specific validation rules as needed for your form fields
    if (!/^([0-9])*$/.test(input.floorNumber)) {
    errors.floorNumber = "Only numbers are allowed";
    }

    if (!/^([0-9])*$/.test(input.aptNumber)) {
    errors.aptNumber = "Only numbers are allowed";
    }

    // Handle image validation
    //if (!input.images) {
      //  errors.images = "Image is required";
    //} else if (!regexImage.test(input.images.name)) {
    //errors.images = "Invalid image format. Upload a valid image file.";
    //}
    

    return errors;
};

export default validate;
