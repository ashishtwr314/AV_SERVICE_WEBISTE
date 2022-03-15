import { useState } from "react";
import { message, Result } from "antd";
import Link from "next/link";

// config
import { DOMAIN_URL } from "../../../../../config/index";

console.log("DOMAIN URL", DOMAIN_URL);

// components
import Feedback from "../feedback/components/Feedback";

// utils
import { SC } from "./utils";
import { submitFeedback } from "../../../../utils/Apicalls";
import router from "next/router";
import { cryptData } from "../../../../utils/utils";

const Header = ({ companyInfo }: any) => {
  return (
    <>
      <header>
        <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
          <a
            href="/"
            className="d-flex align-items-center text-dark text-decoration-none"
          >
            <img className="logo-size" src={companyInfo?.c_logo} />
            &nbsp;&nbsp;
            <span className="fs-4">
              {companyInfo?.c_name} - Feedback Surveys
            </span>
          </a>
        </div>
      </header>
      {/* <div className="p-5 mb-4 bg-soft-primary rounded-3 shadow-lg">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">About Us</h1>
                    <p
                        className="col-md-8 fs-4"
                        dangerouslySetInnerHTML={{
                            __html: companyInfo?.c_description,
                        }}
                    />
                    <button className="btn btn-primary btn-lg" type="button">
                        View all surveys
                    </button>
                </div>
            </div> */}
    </>
  );
};

const FeedbackDescription = ({ feedbackInfo, survey, submitedStat }: any) => {
  const [questions, setQuestions] = useState<any>(
    typeof feedbackInfo.q_format !== "undefined" && feedbackInfo.q_format !== ""
      ? JSON.parse(feedbackInfo.q_format)
      : []
  );

  const f_questionEditor_cust = (
    uuid: string,
    type: string,
    value: string,
    option: string
  ) => {
    if (value) {
      setAnswered(true);
    } else {
      setAnswered(false);
    }

    console.log(uuid, type, value, questions, option);
    const result = SC.fc.f_questionEditor(uuid, type, value, questions, option);

    setQuestions(result);
  };
  const [userData, setUserData] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });
  const [startTime, setStartTime] = useState<any>(null);
  const [answered, setAnswered] = useState<boolean>(false);

  const handleSubmit = () => {
    const handleFeedbackSubmit = async () => {
      const { c, ct, f } = router.query;
      const c_id = await cryptData("dec", c);
      const fc_id = await cryptData("dec", ct);
      const fdq_id = await cryptData("dec", f);
      const endTime = new Date().getTime();
      const time = endTime - startTime;
      let sec = Math.floor((time / 1000) % 60);
      // console.log("Time taken", sec);
      const formData = new FormData();
      formData.append("c_id", c_id);
      formData.append("fc_id", fc_id);
      formData.append("fdq_id", fdq_id);
      formData.append("fdqa_time_taken_to_finish", JSON.stringify(sec));
      formData.append("fdqa_qst_ans_json_format", JSON.stringify(questions));
      formData.append("name", userData?.name);
      formData.append("email", userData?.email);

      console.log(formData);

      try {
        const res = await submitFeedback(formData);
        console.log("RES", res);
        //     {
        //     c_id: parseInt(c_id),
        //     fc_id: parseInt(fc_id),
        //     fdq_id: parseInt(fdq_id),
        // name: userData?.name,
        // email: userData?.email,
        //     fdqa_time_taken_to_finish: sec,
        //     fdqa_qst_ans_json_format: questions,
        // }
        submitedStat.setIsSubmitted(true);
      } catch (err) {
        err.response.data?.message?.email &&
          message.error(err.response.data?.message?.email[0]);

        err.response.data?.message?.name &&
          message.error(err.response.data?.message?.name[0]);
      }
    };

    handleFeedbackSubmit();
  };

  return (
    <>
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">{feedbackInfo?.title}</h1>
        <p className="col-md-8 fs-4">{feedbackInfo?.description}</p>

        {!survey.isSurveyClicked ? (
          <form
            onSubmit={(e) => {
              e.preventDefault;
              console.log("take survey");
              setStartTime(new Date().getTime());
              survey.setIsSurveyClicked(true);
            }}
          >
            <div className="form-group mb-3">
              <label htmlFor="inputUserName">Name</label>
              <input
                type="text"
                className="form-control"
                id="inputUserName"
                aria-describedby="input-user-name"
                placeholder="Enter name"
                required
                onChange={(e) =>
                  setUserData((s) => ({
                    ...s,
                    name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="inputUserEmail">Email address</label>
              <input
                type="email"
                className="form-control"
                id="inputUserEmail"
                aria-describedby="input-user-email"
                placeholder="Enter email"
                // required
                onChange={(e) =>
                  setUserData((s) => ({
                    ...s,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <button className="btn btn-primary btn-lg" type="submit">
              Take Survey
            </button>
          </form>
        ) : (
          <></>
          // <button
          //     onClick={() => {
          //         console.log("cancel survey");
          //         survey.setIsSurveyClicked(false);
          //     }}
          //     className="btn btn-danger btn-lg"
          //     type="button"
          // >
          //     Cancel Survey
          // </button>
        )}
      </div>
      {survey.isSurveyClicked && (
        <div className="container-fluid py-5">
          <Feedback
            setQuestions={setQuestions}
            answered={answered}
            setAnswered={setAnswered}
            questions={questions}
            f_questionEditor_cust={f_questionEditor_cust}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </>
  );
};

const PageLayout = ({ feedbackContent, survey }: any) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  return (
    <div className="container py-4">
      <Header companyInfo={feedbackContent?.companyInfo} />
      <div className="p-5 mb-4 rounded-3 shadow-lg">
        {!isSubmitted ? (
          <FeedbackDescription
            feedbackInfo={feedbackContent?.feedbackInfo}
            survey={survey}
            submitedStat={{
              isSubmitted,
              setIsSubmitted,
            }}
          />
        ) : (
          <Result
            status="success"
            title="Feedback has been Successfully Submitted!"
            subTitle="Thanks for completing this Feedback. Now create your own — it's free, easy, & beautiful"
            extra={
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => location.reload()}
              >
                Take me there!
              </button>
            }
          />
        )}
      </div>
    </div>
  );
};

export default PageLayout;
