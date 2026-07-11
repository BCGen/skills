# The mindmap

`docs/ideas/<slug>/mindmap.html` — one self-contained file, rendered by
[markmap](https://markmap.js.org/)'s autoloader from a Markdown outline embedded
in the page. Branches expand and collapse on click; nothing is installed, and
the file is opened straight from disk. It fetches the library from a CDN, so it
needs a network connection the first time it is opened — say so when handing it
over.

Copy the script tag exactly as written below. Its version is pinned and its
`integrity` hash belongs to that exact version: change one without the other and
the browser blocks the script, leaving a blank page. The hash covers the loader;
the modules the loader then pulls in are outside its reach, so treat the page as
what it is — a viewer for an idea, not a place to put anything sensitive.

## The outline

Copy the PRD's spine, not its prose. Each `##` section becomes a branch; under
it go the few phrases a reader needs to hold the idea in their head. A branch
carrying a paragraph is a branch nobody will read — this is the map, and the PRD
is the territory.

Keep the riskiest assumption a top-level branch. It earns the position.

## The file

Fill the title and the outline; leave the rest as it stands.

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title><the one-sentence idea></title>
    <style>
      html,
      body {
        margin: 0;
        height: 100%;
      }
      .markmap {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div class="markmap">
      <script type="text/template">
        # <the one-sentence idea>

        ## The pain
        - <who, in what situation>
        - <what it costs them>

        ## How they cope today
        - <the incumbent>

        ## What we imagine
        - <what someone could newly do>

        ## Success looks like
        - <the checkable sentence>

        ## Deliberately not
        - <what is left out>

        ## Riskiest assumption
        - <the load-bearing belief>
        - <how it could be tested>

        ## Open questions
        - <what nobody knew>
      </script>
    </div>
    <script
      src="https://cdn.jsdelivr.net/npm/markmap-autoloader@0.18.12"
      integrity="sha384-9zw1CIUEvIayWHijWFlNbU10nwKEeWrc06N+On+S8NLOP1bETjGYKeF4SuEcmXYS"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
```

Drop a branch whose PRD section is empty rather than rendering an empty node.
For a new product, that is usually "Why here"; the outline above already omits
it — add it back when the idea is a capability on an existing product.
