export const Constant = {
    localStorage: {
        Sign: "SignData",
        Product: "Product",
        Manufacture:"Manufacture",
        Brand:"Brand"
    },
    database:
    {
        baseName: "BusinessManagement",
        signInData: "SignTable",
        signUpData: "SignUpTable",
        orderData: "OrderTable",
        productData:"ProductTable",
        ConfigData:"ConfigtTable"
    },
    flag:
    {
        true: "True",
        false: "False",
        null:"",

    },
    logging:{
        path:"./assets/logging",
        filename:"/logging.txt",
    },
    filename:
    {
        productImage:"ProductImage.png",
        productEditedImage:"productEditedImage.png",
        otherImage:"OtherImage.zip",
        paymentSSImage:"PaymentSSImage.png",
        referenceImage:"ReferenceImage.png"
    },
    OrderStatus:
    {
        Placed:"Order Placed",
        Approved:"Order Approved",
        Editing:"Editor Assigned",
        verfication:"Waiting for Customer Approval",
        ApprovedC:"Customer Approved",
        manufacture:"Assigned for Making",
        making:"Making Started",
        DispatchReady:"Ready for Dispatch",
        Dispatched:"Order Dispatched",
        Delivered:"Order Delivered",
        OrderDamage:"Damaged Order",
        NotApproved:"Order Not Approved"

    },
    dateFormat:{
        string:'MM-dd-YYYY hh:mm:ss a',
        lan:'en',
        zone:'UTC+5:30'

    }

}
