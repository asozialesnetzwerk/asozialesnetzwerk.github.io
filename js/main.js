// Get the wiki data
let wikiJson = [];
$.get('/api/wiki.json', function (data) {
    wikiJson = data;
}, 'json');

let searchBox = document.getElementById('search-box');
let lastSearchTerm = null;

// Removes suggestions
function removeSuggestions() {
    let autocompleteList = document.getElementById('autocomplete-list');
    if (autocompleteList !== null) {
        autocompleteList.remove();
    }
    lastSearchTerm = null;
}

// Displays suggestions for the search
function displaySuggestions() {
    // Don't rerender if it's the same search term
    if (lastSearchTerm === searchBox.value) {
        return;
    }
    lastSearchTerm = searchBox.value;

    // Don#t display suggestions for empty search terms
    if (searchBox.value === '') {
        return removeSuggestions();
    }

    // Remove if one already exists
    let autocompleteList = document.getElementById('autocomplete-list');
    if (autocompleteList !== null) {
        autocompleteList.remove();
    }

    // Add dropdown menu
    autocompleteList = document.createElement('div');
    autocompleteList.setAttribute('id', 'autocomplete-list');
    autocompleteList.setAttribute('class', 'dropdown-menu');
    searchBox.parentElement.appendChild(autocompleteList);

    // Fill dropdown menu
    let searchResults = searchWikiArticles(searchBox.value);
    autocompleteList.innerHTML += '<div class="dropdown-header"><strong>Wiki-Artikel</strong></div>';
    if (searchResults.length <= 0) {
        autocompleteList.innerHTML += '<div class="dropdown-header">Keine Ergebnisse</div>';
    }
    for (let i = 0; i < searchResults.length; i++) {
        autocompleteList.appendChild(searchResults[i]);
    }

    $('#autocomplete-list').dropdown('toggle');
}

// Search for wiki articles and return an array with html elements
function searchWikiArticles(search) {
    let searchResults = [];
    let counter = 0;
    for (let i = 0; i < wikiJson.length; i++) {
        const searchLowerCase = search.toLowerCase();
        const keywords = wikiJson[0].keywords;
        let found = false;
        for (let j = 0; j < keywords.length; j++) {
            if (keywords[j].toLowerCase().indexOf(searchLowerCase) !== -1) {
                found = true;
                break;
            }
        }
        if (found || wikiJson[i].title.toLowerCase().indexOf(searchLowerCase) !== -1) {
            let autocompleteElement = document.createElement('div');
            autocompleteElement.innerHTML = '<a class="dropdown-item" href="' + wikiJson[i].url + '" onclick="location.href = \'' + wikiJson[i].url + '\'">' + highlightWordsNoCase(wikiJson[i].title, searchBox.value) + '</a>';
            searchResults.push(autocompleteElement);
            counter++;
        }
        if (counter >= 7) {
            break;
        }
    }
    return searchResults;
}

// Escapes regex characters
RegExp.escape = function(str) {
    var specials = /[.*+?|()\[\]{}\\$^]/g; // .*+?|()[]{}\$^
    return str.replace(specials, '\\$&');
};

// Highlights the given word
function highlightWordsNoCase(line, word) {
    var regex = new RegExp('(' + RegExp.escape(word) + ')', 'gi');
    return line.replace(regex, '<strong>$1</strong>');
}

// Add some event listeners to update the suggestions
searchBox.addEventListener('focusin', () => displaySuggestions());
searchBox.addEventListener('focusout', () => setTimeout(() => removeSuggestions(), 200));
$('#search-box').on('change keydown paste input', function() {
    displaySuggestions();
});

// Anchors
document.addEventListener("DOMContentLoaded", function(event) {
    anchors.add('h1:not(.no-anchor)');
    anchors.add('h2:not(.no-anchor)');
    anchors.add('h3:not(.no-anchor)');
});

// Replace placeholders
function replaceInDOM(node, pattern, replacement) {
    if (node.nodeType === 3) {
        node.data = node.data.replace(pattern, replacement);
    }
    if (node.nodeType === 1 && node.nodeName !== "SCRIPT") {
        for (var i = 0; i < node.childNodes.length; i++) {
            replaceInDOM(node.childNodes[i], pattern, replacement);
        }
    }
}