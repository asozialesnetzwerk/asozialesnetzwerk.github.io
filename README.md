# Webseite des Asozialen Netzwerkes

## Webseite lokal nutzen
[RubyGems](https://rubygems.org/) installieren:
```
gem install bundler jekyll
git clone https://github.com/asozialesnetzwerk/asozialesnetzwerk.github.io.git
cd asozialesnetzwerk.github.io
bundle exec jekyll serve
```

## Wiki-Artikel editieren
Wiki-Artikel liegen im Ordner`_wiki`.
Sie sind in einfachem [Markdown](https://www.heise.de/mac-and-i/downloads/65/1/1/6/7/1/0/3/Markdown-CheatSheet-Deutsch.pdf) geschrieben und können daher schnell von Laien editiert werden.

## Wiki-Artikel erstellen
Ein Wiki-Artikel hat folgende Struktur:
```
---
title: "Artikel-Titel"
headline: "Artikel-Überschrift
position: 3
keywords:
- Stichpunkt1
- Stickpunkt2
---

Der Inhalt eines Artikels:
```
* `title`: Der Titel des Artikels; wird für den HTML-Tag`<title>` und die Seitennavigation verwendet.
* `headline`: Die Überschrift des Artikels; wird als <h1> dargestellt. Ohne Überschrift wird der Titel verwendet.
* `position`: Die Position des Artikels in der entsprechenden Kategorie; startet mit `1`.
* `keywords`: Eine Keyword-Liste, die für die Suche verwendet wird. Titel oder Überschrift sollten hier nicht auftauchen.
