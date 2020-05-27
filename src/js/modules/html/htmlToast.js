export default (message, color) => {
  return /*html*/ `
<div class="toast">
    <div class="toast__message" ${
      color ? `style="background-color:${color}"` : ""
    }>${message}</div>
</div>
`;
};
