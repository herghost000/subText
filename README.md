# Javascript SubText
> A jquery plugin for intercepting text in html.

# Installation
In a browser:
```
<script src='jquery.js'></script>
<script src='subText.js'></script>
```
# Usage
html
```
<table style="border:1px solid #000;" border="0">
  <tr>
    <td>Life is a journey. What we should care about is not where it's headed but what we see and how we feel.</td>
    <td>
      <p>I cannot give you the formula for success, but I can give you the formula for failure, which is: Try to please everybody. </p>
    </td>
    <td>All you can do is to try your best. Even with those small steps, you're closer to your goal than you were yesterday.  
      <p>I prefer having your accompanying for life-long time to the short-time tenderness</p>
      <address>qq77209302</address>
    </td>
  </tr>
</table>
```
js
```
var rets = $("td").subText(20, "...")
console.log(rets)
```

