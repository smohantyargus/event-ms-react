import React, { useContext, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "api";

import logo from "../../icons/logo.png";
import UserContext from "context/user/UserContext";

const edata = [
  "akshatj",
  "amurdia",
  "ashah",
  "aanand",
  "apatkar",
  "avadhadiya",
  "achauhan",
  "araval",
  "abhagat",
  "achavda",
  "abohra",
  "apatra",
  "ajangid",
  "akumar",
  "akotadiya",
  "adoshi",
  "arani",
  "agupta",
  "ajani",
  "akumari",
  "agajjar",
  "aroy",
  "akar",
  "akhunt",
  "apratap",
  "athakur",
  "asurpaithankar",
  "apradhan",
  "aseth",
  "apainuli",
  "amadagam",
  "aghosh",
  "aporwal",
  "ajain",
  "asingh",
  "abhavsar",
  "ashukla",
  "athumar",
  "akhokhariya",
  "apandagre",
  "avala",
  "amohan",
  "asingh",
  "avninders",
  "bmehta",
  "bsarkar",
  "bchikhly",
  "bsuhagiya",
  "bbalasra",
  "bsojitra",
  "bkalyani",
  "bviroja",
  "bdangi",
  "ccarpenter",
  "cchavda",
  "ckhanderiya",
  "cpatel",
  "cgupta",
  "cdhamsaniya",
  "cprajapati",
  "cunadkat",
  "dpatel",
  "ddeshani",
  "dpradhan",
  "devs",
  "devaanshs",
  "dparmar",
  "dvasa",
  "devendra",
  "dghodasara",
  "dhairyas",
  "dvanparia",
  "dyadav",
  "dshah",
  "dkaushik",
  "dkumar",
  "dsindha",
  "dvagadiya",
  "dhruvp",
  "davaiya",
  "dpatel",
  "dbanik",
  "dipeshk",
  "dsingh",
  "djain",
  "emer",
  "falguni",
  "sfardin",
  "gsingh",
  "gsamal",
  "ggupta",
  "gsharma",
  "guneets",
  "hkardam",
  "hraja",
  "hparikh",
  "hkyada",
  "harshp",
  "htrambadia",
  "hmakhijani",
  "hkaneria",
  "hshah",
  "hsutaria",
  "hmahwish",
  "hrawal",
  "hetvis",
  "hjaiswal",
  "hpatel",
  "hmorzariya",
  "hkathiria",
  "hagarwal",
  "ishaneshah",
  "isinha",
  "ivasiwala",
  "jghosh",
  "jjani",
  "jhirpara",
  "jbhatt",
  "jkalariya",
  "jprajapati",
  "jsakervala",
  "kreddy",
  "kpipadwala",
  "ksikder",
  "kraja",
  "karanp",
  "kthakkar",
  "ksoni",
  "ketulp",
  "kshah",
  "khyativ",
  "krathore",
  "kjadeja",
  "kpatel",
  "kyadav",
  "kjain",
  "kgohel",
  "krupangp",
  "knidhi",
  "kunjanp",
  "kkhaneja",
  "ldhingra",
  "mkumari",
  "mvirole",
  "mmathur",
  "mvarma",
  "mmadhwam",
  "mshah",
  "mjohn",
  "manushs",
  "mdave",
  "mmodi",
  "sayaz",
  "mgupta",
  "mvithlani",
  "msingh",
  "mjoshi",
  "prmohanlal",
  "mvadodariya",
  "myadav",
  "mdhing",
  "mdhara",
  "mmadagam",
  "nchatterjee",
  "nravikumar",
  "nainavees",
  "npaun",
  "nghevariya",
  "nnama",
  "nraval",
  "ndodiya",
  "nthumar",
  "ndhal",
  "nlimje",
  "nbhimani",
  "ngandhi",
  "npatel",
  "nsahu",
  "nparekh",
  "npatel",
  "nlathiya",
  "ndesai",
  "nishank",
  "ngoyal",
  "ndash",
  "pparida",
  "pbalasubramanian",
  "psethy",
  "psadatiya",
  "psavaliya",
  "ptanna",
  "pjha",
  "ptarun",
  "prajput",
  "poorvip",
  "pkumar",
  "pdhara",
  "pgarg",
  "prateekk",
  "psoni",
  "psray",
  "pprajapati",
  "pdabhi",
  "pprajapati",
  "pbangari",
  "pkumari",
  "ppatel",
  "qjain",
  "rbhayani",
  "rkumar",
  "rpatnaik",
  "rkadhi",
  "rpatel",
  "rajank",
  "rpanda",
  "rkantaria",
  "rjain",
  "rthakor",
  "rgopalan",
  "rparikh",
  "rshankar",
  "rshingala",
  "rpatel",
  "raggarwal",
  "rshrivastava",
  "rsoni",
  "ruchitap",
  "rjobanputra",
  "rdayani",
  "sverma",
  "schoudhary",
  "smohanty",
  "sdwivedy",
  "spattnaik",
  "sjangir",
  "skhan",
  "spanchasara",
  "ssabunwala",
  "skeshav",
  "skatara",
  "smondal",
  "schauhan",
  "spurswani",
  "snagwani",
  "schanda",
  "srathod",
  "ssrivastava",
  "ssoni",
  "sraijada",
  "satyams",
  "avsethu",
  "smehta",
  "sdshukla",
  "sraj",
  "sdixit",
  "ssuthar",
  "ssalheen",
  "shinuk",
  "shivamp",
  "skhare",
  "smistry",
  "svishwakarma",
  "svyas",
  "shreyas",
  "schaurasia",
  "skaurav",
  "sjain",
  "sjha",
  "skunpara",
  "spanchal",
  "sbhalodiya",
  "sgandhi",
  "snehas",
  "sdebyans",
  "sraj",
  "sganguly",
  "snandi",
  "schaudhury",
  "sbashyam",
  "subhamk",
  "skutum",
  "ssingh",
  "sbanerjee",
  "sjena",
  "sgazdhar",
  "sahuja",
  "sdana",
  "ssharma",
  "sbhadoriya",
  "spanth",
  "sparhi",
  "tsannigrahi",
  "tsharma",
  "tmulchandani",
  "tdave",
  "tirthp",
  "tpatel",
  "uintwala",
  "ujadhav",
  "ushah",
  "vsampath",
  "vaibhavs",
  "vbhojani",
  "vkaur",
  "vgupta",
  "vkumar",
  "vshukla",
  "vvaghela",
  "virenv",
  "vsharma",
  "vgodhani",
  "vkhati",
  "vpawar",
  "vtomar",
  "hsoni",
  "vgandhi",
  "ypatel",
  "yrao",
  "yshah",
  "ybhindi",
  "ypomal",
  "ykhanna",
  "ytiwari",
  "zraja",
  "kshingala",
];

const Register = () => {
  const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  let { setVisibilityTrue, setVisibilityFalse } = useContext(UserContext);

  const role = "USER";

  const toggle = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user_email = email.split("@")[0];
    const user_email_domain = email.split("@")[1];

    // console.log(user_email, user_email_domain);

    if (
      // edata.includes(user_email) &&
      // (user_email_domain === "dev.com" || user_email_domain === "dev.in") &&
      firstName !== "" &&
      lastName !== "" &&
      password !== ""
    ) {
      console.log("Verified User Details");

      let data = {
        firstName,
        lastName,
        email,
        password,
        role,
      };

      let otpData = {
        email,
      };
      setVisibilityTrue();
      api
        .post("/auth/signup", data)
        .then((response) => {
          // console.log(response);
          localStorage.setItem("token", response.data.token);
          // localStorage.setItem("userToVerify", JSON.stringify(response.data));

          api
            .post("/user/send-otp", otpData)
            .then((res) => {
              navigate(`/new/${response.data.email}`);
              setVisibilityFalse();
              // console.log(res);
              toast.info("Verify User!", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            })
            .catch((error) => {
              setVisibilityFalse();
              console.log(error);
            });
          // Handle the response
          // console.log(response.data);
          // localStorage.setItem("token", response.data.token);

          // toast.success("User Registered!", {
          //   position: "bottom-center",
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "colored",
          // });
        })
        .catch((error) => {
          // Handle the error
          console.log(error);
        });
    } else {
      toast.error("Invalid User Details!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="register-container">
      <div className="register row shadow">
        <img src={logo} className="arg-logo" alt="argusoft" />
        <form onSubmit={handleSubmit}>
          <div className="register-header">
            <h3>Event-MS Register</h3>
          </div>

          <input
            type="firstname"
            class="form-control form-control-lg input"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            type="lastname"
            class="form-control form-control-lg input"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <input
            type="email"
            class="form-control form-control-lg input"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type={showPassword ? "text" : "password"}
            class="form-control form-control-lg input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn mt-2 input" onClick={toggle}>
            {showPassword ? "Hide Password" : "Show Password"}
          </button>
          <div>
            <button
              type="button"
              class="btn btn-primary btn-lg"
              style={{
                paddingLeft: "2.5rem",
                paddingRight: "2.5rem",
                marginBottom: "0.5rem",
                backgroundColor: "#802f59",
                borderColor: "#802f59",
              }}
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
          <p class="mt-4">
            Already registered ? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
