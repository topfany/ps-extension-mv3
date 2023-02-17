// test commit 2
chrome.webRequest.onAuthRequired.addListener(
    async function (details, callbackFn) {
        var config = {
            mode: "pac_script",
            pacScript: {
                data: "function dnsDomainIs(host, pattern) {return host.length >= pattern.length && (host === pattern || host.substring(host.length - pattern.length - 1) === '.' + pattern);};\n"+
                    "function FindProxyForURL(url, host) {\n"+
                    "var PROXY = 'HTTPS mattvu.commentbot.live:443'\n"+
                    "if (isPlainHostName(host) ||\n" +
                    "shExpMatch(host, '*.local') ||\n"+
                    "isInNet(dnsResolve(host), '10.0.0.0', '255.0.0.0') ||\n"+
                    "isInNet(dnsResolve(host), '172.16.0.0',  '255.240.0.0') ||\n"+
                    "isInNet(dnsResolve(host), '192.168.0.0',  '255.255.0.0') ||\n"+
                    "isInNet(dnsResolve(host), '127.0.0.0', '255.255.255.0')) return 'direct';\n"+
                    " return PROXY;\n"+
                    "}\n"
            }
        };

        chrome.proxy.settings.set( {value: config, scope: 'regular'},function() {  });

        callbackFn({
            authCredentials: { username: "topfany", password: "963852wei" }
        });
    },
    { urls: ["<all_urls>"] },
    ['asyncBlocking']
);

console.log('hello, world');

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['/assets/js/background.min.js'],
    });
});
