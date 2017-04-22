# ![todo-lists-icon](https://cloud.githubusercontent.com/assets/1267580/25303557/a094af88-2755-11e7-9a9f-61c5bae7778b.png) TODOLists

TODOLists is a [Coda](https://www.panic.com/coda/) webscript sidebar plugin for managing TODO comments

![todo-lists](https://cloud.githubusercontent.com/assets/1267580/25303540/6737fa24-2755-11e7-91d2-8bf780244255.png)


## Installation

1. Download [TODOLists-WebScript-Sidebar-master.zip](https://github.com/dgmid/TODOLists-WebScript-Sidebar/archive/master.zip).
2. Unzip it.
3. Double-click the "TODOlists.codawebscriptsidebar" icon.

**TODOLists** has been uploaded to the Panic [PlugIns](https://www.panic.com/coda/plugins.php#Sidebars) page, so you should recieve automatic updates when they are available.

## Usage

**TODOLists** manages comments with the following label types, which are case insensitive:

- TODO
- TOFIX
- FIXME
- ISSUE
- BUG
- NOTE
- OPTIMIZE
- XXX
- HACK
- DONE

The following types of comment are recognised:

```
/* TODO lorem ipsum dolor sit amet… */
\# TODO lorem ipsum dolor sit amet…
// TODO lorem ipsum dolor sit amet…
<!-- TODO lorem ipsum dolor sit amet -->
```

When a comment is selected in the sidebar, it's *label* type can be quickly modified using the **mark as…** menu.

A *specifier* (for example, the name of the person responsible for the comment) can be added in parenthesis directly after the *label*:

```
//note(@duncanmid): lorem ipsum dolor sit amet…
```

Comments can be filtered by *label* and by *specifier* using the **label** and **specifier** menus.

The plugin options can be accessed by clicking the gear icon ![options](https://cloud.githubusercontent.com/assets/1267580/25303541/67516d1a-2755-11e7-925c-f13267800931.png).

## Requirements

[Coda 2.5+](https://www.panic.com/coda/)

## License

CC-BY-NC-SA 4.0 [![cc-by-nc-sa-4.0](https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png)](http://creativecommons.org/licenses/by-nc-sa/4.0/)
