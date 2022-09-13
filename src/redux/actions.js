//! динамика
export const myAction = (name, number) => ({
    type: "MY_ACTION",
    payload: { name, number },
});



//! Статика:
export const myAction_2 = {
    type: "MY_ACTION_2",
    payload: { text: "super payload_2" },
};

// export default { myAction, myAction_2 };