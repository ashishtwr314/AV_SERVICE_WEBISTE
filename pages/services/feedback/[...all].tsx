import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// components
import PageLoader from "../../../src/components/global/PageLoader";
import PageLayout from "../../../src/components/local/services/feedback/PageLayout";

// API Calls
import { fetchFeedbackById, submitFeedback } from "../../../src/utils/Apicalls";

// utils
import { cryptData } from "../../../src/utils/utils";

const Feedback = () => {
    const router = useRouter();
    const [isPageLoad, setIsPageLoad] = useState<boolean>(true);
    const [feedbackContent, setFeedbackContent] = useState<any>(null);
    const [isSurveyClicked, setIsSurveyClicked] = useState<boolean>(false);

    const getFeedback = async () => {
        setIsPageLoad(true);
        const { c, ct, f } = router.query;
        const c_id = await cryptData("dec", c);
        const fc_id = await cryptData("dec", ct);
        const fdq_id = await cryptData("dec", f);

        await fetchFeedbackById({ c_id, fc_id, fdq_id })
            .then((resp) => {
                console.log(resp);
                if (resp.status === 200) setFeedbackContent(resp.data);
            })
            .then(() => {
                setIsPageLoad(false);
            })
            .catch(() => {});
    };

    useEffect(() => {
        if (!router.isReady) return;
        getFeedback();
    }, [router.isReady]);

    return isPageLoad ? (
        <PageLoader typeT="Bars" visibleT={true} />
    ) : (
        <PageLayout
            feedbackContent={feedbackContent}
            survey={{
                isSurveyClicked,
                setIsSurveyClicked,
            }}
        />
    );
};

export default Feedback;
