import clsx from "clsx";
import { useState, useEffect } from "react";
import styles from "./dangnhap.module.scss";
import { Navigate, useNavigate } from "react-router-dom";
import firebaseConfigGlobal from "src/firebase";

const DangNhap = () => {
  const [txtPhoneNumber, setTxtPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const configureCaptcha = () => {
    (window as any).recaptchaVerifier =
      new firebaseConfigGlobal.auth.RecaptchaVerifier("sign-in-button", {
        size: "invisible",
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          handleSubmit("");
          console.log("Recaptca varified");
        },
        defaultCountry: "VN",
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const phoneNumber = "+84" + txtPhoneNumber;
    if (
      phoneNumber.length < 9 ||
      phoneNumber === "" ||
      phoneNumber === undefined
    ) {
      alert("Số điện thoại không hợp lệ");
    } else {
      setFlag(true);
      configureCaptcha();
      const appVerifier = (window as any).recaptchaVerifier;
      console.log(phoneNumber);
      firebaseConfigGlobal
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          (window as any).confirmationResult = confirmationResult;
          console.log("OTP has been sent");
        })
        .catch((error) => {
          console.log("SMS not sent");

          console.log(error);
          appVerifier.clear();
        });
    }
  };

  const submitOTP = (e: any) => {
    e.preventDefault();
    const code = otp;
    (window as any).confirmationResult
      .confirm(code)
      .then((result: any) => {
        //User signed in successfully.
        // customerService.getCustomerByPhone(txtPhoneNumber).then((res) => {
        //   if (res.length > 0) {
        //     localStorage.setItem("customerInfo", JSON.stringify(res[0]));
        //     window.location.reload();
        //   }
        // });
      })
      .catch((error: any) => {
        //User couldn't sign in (bad verification code?)
      });
  };

  const changeNum = (e: any) => {
    e.preventDefault();
    setFlag(false);
    (window as any).recaptchaVerifier.clear();
  };
  return (
    <section className={styles.login}>
      <div
        className={clsx("d1", "step1")}
        style={{ display: !flag ? "block" : "none" }}
      >
        <img src="https://www.thegioididong.com/lich-su-mua-hang/images/i1.png"></img>
        <span>TRA CỨU THÔNG TIN ĐƠN HÀNG</span>
        <form id="frmGetVerifyCode" onSubmit={(e) => handleSubmit(e)}>
          <div id="sign-in-button" style={{ display: "none" }}></div>

          <input
            type="tel"
            value={txtPhoneNumber}
            placeholder="Nhập số điện thoại mua hàng"
            autoComplete="off"
            maxLength={10}
            onChange={(e) => setTxtPhoneNumber(e.target.value)}
          ></input>
          <button type="submit" className={styles.btn} id="submitPhone">
            Tiếp tục
          </button>
        </form>
      </div>

      <div
        className={clsx("d2", "step2")}
        style={{ display: flag ? "block" : "none" }}
      >
        <span className="s1">
          Mã xác nhận đã được gửi đến số điện thoại <b>{txtPhoneNumber}</b>
        </span>
        <form id="frmSubmitVerifyCode" onSubmit={(e) => submitOTP(e)}>
          <input
            type="number"
            maxLength={6}
            value={otp}
            placeholder="Nhập mã xác nhận"
            onChange={(e) => setOtp(e.target.value)}
          ></input>
          <button className={styles.btn} id="submitOTP">
            Tiếp tục
          </button>
        </form>
        {/* <a className="resend-sms" href="javascript:GetVerifyCode(1)">
                    Tôi không nhận được mã, vui lòng gửi lại
                </a> */}

        <a className={styles.btnChangeNum} onClick={(e) => changeNum(e)}>
          Thay đổi số điện thoại
        </a>
      </div>
    </section>
  );
};
export default DangNhap;
