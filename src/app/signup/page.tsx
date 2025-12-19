// import Register from "@/components/Register";
// import React from "react";

// const SignUpPage = () => {
//   return (
//     <div>
//       <Register />
//     </div>
//   );
// };

// export default SignUpPage;
import OtpLogin from "@/components/OtpLogin";

function Register() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-center mb-5">
        How to Add One-Time Password Phone Authentication
      </h1>

      <OtpLogin />
    </div>
  );
}

export default Register;
