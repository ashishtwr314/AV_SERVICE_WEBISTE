/**
 * Question Editor function
 * @return List
 * @param uuid, type, value, option
 * @function Callback
 */
const f_questionEditor = (
    uuid: string,
    type: string,
    value: string,
    passedQuestions: any,
    option: string | null = null
) => {
    const tmpQuestions = passedQuestions;
    const newQuestions: any = [];

    if (type === "multiple") {
        tmpQuestions.forEach((item: any) => {
            if (item.uuid === uuid) {
                if (option === "question") {
                    item.q = value;
                } else if (option === "a") {
                    item.a.a = value;
                } else if (option === "b") {
                    item.a.b = value;
                } else if (option === "c") {
                    item.a.c = value;
                } else if (option === "d") {
                    item.a.d = value;
                } else if (option === "d") {
                    item.a.d = value;
                } else if (option === "given_answer") {
                    item.given_answer = value;
                }
            }
            newQuestions.push(item);
        });
        return newQuestions;
    } else if (type === "single") {
        tmpQuestions.forEach((item: any) => {
            if (item.uuid === uuid) {
                if (option === "question") {
                    item.q = value;
                } else if (option === "a") {
                    item.a.a = value;
                } else if (option === "b") {
                    item.a.b = value;
                } else if (option === "c") {
                    item.a.c = value;
                } else if (option === "d") {
                    item.a.d = value;
                } else if (option === "given_answer") {
                    item.given_answer = value;
                }
            }
            newQuestions.push(item);
        });
        return newQuestions;
    } else if (type === "boolean") {
        tmpQuestions.forEach((item: any) => {
            if (item.uuid === uuid) {
                if (option === "question") {
                    item.q = value;
                } else if (option === "a") {
                    item.a.a = value;
                } else if (option === "b") {
                    item.a.b = value;
                } else if (option === "given_answer") {
                    item.given_answer = value;
                }
            }
            newQuestions.push(item);
        });
        return newQuestions;
    } else if (type === "comment") {
        tmpQuestions.forEach((item: any) => {
            if (item.uuid === uuid) {
                if (option === "question") {
                    item.q = value;
                } else if (option === "txt") {
                    item.a = value;
                } else if (option === "given_answer") {
                    item.given_answer = value;
                }
            }
            newQuestions.push(item);
        });
        return newQuestions;
    } else if (type === "nps") {
        tmpQuestions.forEach((item: any) => {
            if (item.uuid === uuid) {
                if (option === "question") {
                    item.q = value;
                } else if (option === "given_answer") {
                    item.given_answer = value;
                }
            }
            newQuestions.push(item);
        });
        return newQuestions;
    } else if (type === "star_rating") {
        tmpQuestions.forEach((item: any) => {
            if (item.uuid === uuid) {
                if (option === "question") {
                    item.q = value;
                } else if (option === "given_answer") {
                    item.given_answer = value;
                }
            }
            newQuestions.push(item);
        });
        return newQuestions;
    } else if (type === "emoji_rating") {
        tmpQuestions.forEach((item: any) => {
            if (item.uuid === uuid) {
                if (option === "question") {
                    item.q = value;
                } else if (option === "given_answer") {
                    item.given_answer = value;
                }
            }
            newQuestions.push(item);
        });
        return newQuestions;
    } else if (type === "text_slider") {
        tmpQuestions.forEach((item: any) => {
            if (item.uuid === uuid) {
                if (option === "question") {
                    item.q = value;
                } else if (option === "given_answer") {
                    item.given_answer = value;
                }
            }
            newQuestions.push(item);
        });
        return newQuestions;
    }else if (type === "thumbs_up_emoji") {
        tmpQuestions.forEach((item: any) => {
            if (item.uuid === uuid) {
                if (option === "question") {
                    item.q = value;
                } else if (option === "given_answer") {
                    item.given_answer = value;
                }
            }
            newQuestions.push(item);
        });
        return newQuestions;
    }
};

/**
 * Dynamic Feedback Creation Config -- short form fc
 * Declare common question templates to be used
 */
const fc = {
    f_questionEditor,
};

/**
 * Sidebar Config -- short form SC
 */
export const SC = {
    fc,
};
