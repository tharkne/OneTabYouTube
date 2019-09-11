const pattern1 = "youtube.com"

const filter = {
    urls: [pattern1]
  }

async function logTabs(tabs) {
    let tubeTabs = 0;

    for (let tab of tabs) {
      // tab.url requires the `tabs` permission
      console.log(tab.url);

      let address = tab.url;
        if(address.includes(pattern1)){
            console.log("Tube-ular!!!")
            tubeTabs++;
        }
    }
    if(tubeTabs > 1){
        removeTube(tabs, tubeTabs);
    }
}

async function removeTube(tabs, tubeTabs){
    var oldestTime = Number.MAX_VALUE;
    var index = 0;
    var current = 0;

    while(tubeTabs > 1){ 
        console.log(tubeTabs);
        for (let tab of tabs) {
            let address = tab.url;

            if(address.includes(pattern1)){
                if(tab.lastAccessed < oldestTime){
                    oldestTime = tab.lastAccessed;
                    index = current;
                }
            }
            current++;
        }
        await browser.tabs.remove(tabs[index].id);
        tubeTabs--;
    }
    
    console.log("rm" + tubeTabs);
}

function onError(error) {
    console.log(`Error: ${error}`);
}
  
function createQuery(){
    console.log(`Working`);
    var querying = browser.tabs.query({currentWindow: true});
    querying.then(logTabs, onError);
}

browser.tabs.onUpdated.addListener(createQuery, filter);