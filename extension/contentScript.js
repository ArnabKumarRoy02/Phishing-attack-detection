(() => {
    let mailInboxTable, mailContent;
    let currentMail = "";
    let currentMailAnchors = [];
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const {type, value, mailId} = obj;

        if (type === "NEW") {
            currentMail = mailId;
            newMailLoaded();
        }
    });

    const newMailLoaded = () => {
        const bookmarkBtnExists = document.querySelector(".bookmark-btn");
        // console.log(bookmarkBtnExists);

        if (!bookmarkBtnExists) {
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
            bookmarkBtn.className = "T-KT " + "bookmark-btn";
            bookmarkBtn.title = "Click to scan for phising links";

            mailInboxTable = document.querySelector('.gE.iv.gt')
            mailInboxTable.append(bookmarkBtn);
            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
        }
    }

    const addNewBookmarkEventHandler = async () => {
        mailContent = document.querySelector('.gs')
        let linksArray = mailContent.querySelectorAll("a");
        for (let link of linksArray) {
            currentMailAnchors.push(link.href)
        }
        // console.log(currentMailAnchors)
        chrome.storage.local.set({
            [currentMail]: JSON.stringify([...currentMailAnchors])
        }).then(data => {
            // console.log(data)
        });
        chrome.storage.local.get([currentMail]).then(data => {
            console.log(data)
        })
        currentMailAnchors = [];
    }

    newMailLoaded()
})();
