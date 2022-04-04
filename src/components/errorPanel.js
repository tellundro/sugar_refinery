import { errorMessages } from "./validationErrors.js"

export default function createErrorPanel(obj) {

  let errorDiv = document.getElementById("errorMessage");

  if (!errorDiv) {
    // create error div if not existante
    errorDiv = document.createElement("div");
    errorDiv.id = "errorMessage";
    let classes = ["z-30", "pl-20", "overflow-y-auto", "cursor-pointer", "hover:border-rose-600", "hover:border", "bottom-0", "right-0", "rounded-none", "w-full", "p-2", "pr-6", "absolute", "bg-zinc-900", "text-sm"]
    classes.forEach((c) => errorDiv.classList.add(c));

    errorDiv.addEventListener("click", () => {
      let self = document.getElementById("errorMessage");
      self.classList.add("invisible");
      self.replaceChildren();
    })

    document.body.appendChild(errorDiv)
  }

  errorDiv.replaceChildren()

  // error header
  let header = document.createElement('p');
  header.innerHTML = "Could not generate files:";
  header.classList.add("text-rose-600");
  header.classList.add("text-sm");
  errorDiv.appendChild(header);

  // error messages
  for (const prop in obj) {
    if (!obj[prop] && prop !== "success") {
      let err = document.createElement('p');
      err.classList.add("text-rose-600");
      err.innerHTML = errorMessages[prop];
      errorDiv.appendChild(err);
    }

    if (prop == "data") {
      let err = document.createElement('p');
      err.classList.add("text-rose-600");
      err.innerHTML = obj[prop] + " | Be sure to load images for all layers in your collection";
      errorDiv.appendChild(err);
    }
  }
  errorDiv.classList.remove("invisible");
}



