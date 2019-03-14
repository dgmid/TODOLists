//note(@duncanmid): TODOLists - Coda 2 Sidebar Plugin v.1.2 | © D.G. Midwinter, @duncanmid

function createSampleFile() {

	var newContent = "<!doctype html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>TODOLists sample comments | © D.G. Midwinter. @duncanmid</title>\n\n\t\t<?php\n\t\t\t#ISSUE: sample PHP comment\n\t\t?>\n\n\t\t<style>\n\t\t\t* {\n\t\t\t\tmargin: 0;\n\t\t\t\tpadding: 0; /* TOFIX(@duncanmid): sample CSS comment */\n\t\t\t}\n\t\t</style>\n\n\t\t<script>\n\t\t\t//TODO: sample javascript comment\n\t\t</script>\n\t</head>\n\n\t<body>\n\t\t<!-- ISSUE(@duncanmid): add some content here -->\n\n\t\t<a href=\"https://www.midwinter-dg.com/downloads/TODOLists-comments.clips\">download TODOLists clips</a>\n\n\t\t<?php\n\n\t\t\t// NOTE (@duncanmid): Comments take the form of: LABEL (SPECIFIER): COMMENT, where LABEL can be any of the following: TODO, TOFIX, FIXME, ISSUE, BUG, NOTE, OPTIMIZE, XXX, HACK, DONE and SPECIFIER is optional. You can use the 'label' and 'specifier' controls to filter comments. Once a comment is selected, you can delete it or use the 'mark as…' control to change its label. Clicking the gear icon will open the plug-in options. You can download some clips for quick creation of comments from the link above!\n\n\t\t?>\n\t</body>\n</html>";

	var newDoc = CodaPlugInsController.makeUntitledDocument();

	newDoc.insertText(newContent);
}
