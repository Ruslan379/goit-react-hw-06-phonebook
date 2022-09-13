//! динамика
export const myAction = value => ({
    type: "MY_ACTION",
    payload: value,
});



//! Статика:
export const myAction_2 = {
    type: "MY_ACTION_2",
    payload: { text: "super payload_2" },
};