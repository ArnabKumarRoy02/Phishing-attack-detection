import {getActiveTabURL} from "./utils.js";
// adding a new bookmark row to the popup
const addNewLink = (links, link) => {
    const linkTitleElement = document.createElement("div");
    const controlsElement = document.createElement("div");
    const newLinkElement = document.createElement("div");
    const percentElement = document.createElement("div")
    linkTitleElement.textContent = link;
    linkTitleElement.className = "link-title";
    controlsElement.className = "link-controls";
    setLinkAttributes("play", link, controlsElement);
    // setLinkAttributes("delete", link, controlsElement);
    // setLinkAttributes("save", link, controlsElement);

    // newLinkElement.id = "link-" + bookmark.time;
    newLinkElement.className = "link";
    // newLinkElement.setAttribute("timestamp", bookmark.time);

    newLinkElement.append(linkTitleElement);
    newLinkElement.appendChild(controlsElement);
    links.append(newLinkElement);
    percentElement.className = "percent"
    percentElement.style.display = "none";
    controlsElement.append(percentElement)
};

const viewLinks = (currentLinks = []) => {
    const linksElement = document.getElementById("links");
    linksElement.innerHTML = "";

    if (currentLinks.length > 0) {
        // console.log("link:")
        for (let i = 0; i < currentLinks.length; i++) {
            const link = currentLinks[i];
            addNewLink(linksElement, link);
        }
    } else {
        linksElement.innerHTML = '<i class="row">No links to show.</i>';
    }
};

const onPlay = async (e) => {
    let link = e.currentTarget.title
    let target = e.currentTarget
    const formData = new FormData();
    formData.append('url', link)
    console.log("the link")
    console.log(link)
    const url = "http://127.0.0.1:5000";
    const options = {
        method: "POST",
        body: formData,
        mode: 'cors'
    };
    let arr = target.parentNode.querySelectorAll('img')
    arr.forEach(a => {
        a.setAttribute('style', 'display: none')
    })
    target.parentNode.querySelector('.percent').style.display = ""
    target.parentNode.querySelector('.percent').className = "percent lds-dual-ring"
    await fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            let floatData = parseFloat(data)
            if (floatData < 0.75) {
                target.parentNode.parentNode.querySelector('.link-title').innerHTML = `<s style="color : orangered; text-decoration-thickness: 1.5px">${target.parentNode.parentNode.querySelector('.link-title').innerText}</s>`
                target.parentNode.querySelector('.percent').className = "percent";
                target.parentNode.querySelector('.percent').style.color = "red"
                target.parentNode.querySelector('.percent').textContent = `${(1 - floatData).toFixed(2) * 100}% unsafe`;
            } else {
                target.parentNode.parentNode.querySelector('.link-title').innerHTML = `<a style="color : dodgerblue" href="${target.parentNode.parentNode.querySelector('.link-title').innerText}">${target.parentNode.parentNode.querySelector('.link-title').innerText}</a>`
                target.parentNode.querySelector('.percent').className = "percent";
                target.parentNode.querySelector('.percent').style.color = "darkgreen"
                target.parentNode.querySelector('.percent').textContent = `${(floatData).toFixed(2) * 100}% safe`;

            }
        });
};

const onDelete = e => {
};

const setLinkAttributes = (src, link, controlParentElement) => {
    const controlElement = document.createElement("img");
    controlElement.src = "assets/" + src + ".png";
    controlElement.title = link;
    if (src === 'play') {
        controlElement.addEventListener("click", onPlay);
    } else {
        controlElement.setAttribute('style', 'display: none')
    }
    controlParentElement.appendChild(controlElement);
};

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();
    const queryParameters = activeTab.url.split("inbox/")[1];

    const currentMail = queryParameters

    if (activeTab.url.includes("mail.google.com/mail/u/") && currentMail) {
        chrome.storage.local.get([currentMail], (data) => {
            const currentMailLinks = data[currentMail] ? JSON.parse(data[currentMail]) : [];
            // console.log(data[currentMail])
            viewLinks(currentMailLinks);
        });
    } else {
        const container = document.getElementsByClassName("container")[0];

        container.innerHTML = '<div class="title">This is not a mail page</div>';
    }
});
