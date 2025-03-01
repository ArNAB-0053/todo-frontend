const AuthNote = () => {
  return (
    <div className="bg-gray-100 border-l-4 border-black text-gray-700 p-4 rounded-md w-[20rem]">
      <p className="font-semibold">Simplified Authentication for Easy Testing</p>
      <div className="h-[0.1px] w-full bg-black my-2"></div>
      <p className="text-sm mt-1">
        To make testing easier, this authentication system has been kept <strong>simple</strong> and does not include email verification.  
        <br />
        <br />
        • <strong>No email verification</strong> (No Nodemailer, OTP, or confirmation links).  
        <br />
        • You can sign up with <strong>any email</strong>, even a fake one like <strong>test123@gmail.com</strong>.  
        <br />
        • If the email is not in the database, a new account is created automatically.  
        <br />
        <br />
        The focus here is to ensure a smooth and quick testing experience for everyone.  
      </p>
    </div>
  );
};

export default AuthNote;
