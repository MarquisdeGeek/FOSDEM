# FOSDEM
Analysis and statistics of the talks at FOSDEM

## Examples

The default run will list various stats, as seen in full in the file `results2024`. Here are samples. For example, with data up to 2024 inclusive:

* Total talks, ever given
> Talks: 10388
> Of duration: 271955 mins

* Total devroom talks, and how many talks from each room
> devrooms: 247  (8864)
>    'Embedded (304)', 'Mozilla (301)', 'Free Java (245)', 'MySQL and Friends (224)', 'Python (174)', 'HPC and computational science (172)', 'Distributions (171)', 'X.Org/Graphics (152)', 'Open Document Editors (151)', 'PostgreSQL (139)', 'Ada (136)', 'Community Development (133)', 'Software Defined Radio (129)', 'Real-time Communications (129)', 'Containers (126)', 'BSD (125)', 'Geospatial (120)', 'Legal and Policy Issues (120)', 'Open Source Design (119)', 'Go (118)', 'LibreOffice (112)', 'Perl Programming Languages (111)', 'Virtualisation and IaaS (110)', 'Testing and Automation (100)', 'Cross desktop (94)', 'Open Media (94)', 'LLVM toolchain (92)', 'Security (91)', 'JavaScript (91)', 'Internet of Things (87)', 'Open Research Tools and Technology... [and so on]

* People with 2 or more talks, or appearances on a panel, since 2000 when the conference started. Then 3 or more. Then 4, and so on.

* A breakdown of every devroom, per year, indicating in which years they were present
```
Mozilla                                                         .**********************.  22
Embedded                                                        ..****************.****.  20
PostgreSQL                                                      ..*....*.**************.  16
MySQL and Friends                                               ...*....**************..  15
BSD                                                             ........***************.  15
Free Java                                                       ...*...*************....  14
X.Org/Graphics                                                  .....*****.*****.***.*..  14
Ada                                                             .....*..*..*****.***.*..  11
Python                                                          ......*.....*****.*****.  11
Distributions                                                   .........*...**********.  11
Testing and Automation                                          ............******.****.  10
Go                                                              .............**********.  10 
```

* A yearly breakdown, containing the talks, duration, speakers, and devrooms since 2001.

| Year | 2001 | 2002 | 2003 | 2004 | 2005 | 2006 | 2007 | 2008 | 2009 | 2010 | 2011 | 2012 | 2013 | 2014 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| Talks | 31 | 92 | 57 | 48 | 78 | 110 | 205 | 230 | 276 | 294 | 316 | 439 | 486 | 513 | 551 | 615 | 666 | 685 | 772 | 868 | 720 | 685 | 777 | 874 |
| Duration (mins) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 16380 | 17245 | 17985 | 18665 | 19420 | 21245 | 20885 | 23545 | 25250 | 24925 | 22360 | 20620 | 23430 |
| Speakers | 25 | 33 | 19 | 20 | 22 | 19 | 49 | 60 | 266 | 54 | 305 | 408 | 475 | 487 | 530 | 569 | 610 | 651 | 730 | 841 | 679 | 653 | 786 | 947 |
| DevRooms | 0 | 5 | 6 | 7 | 18 | 16 | 15 | 16 | 19 | 22 | 20 | 35 | 30 | 33 | 36 | 38 | 41 | 42 | 47 | 56 | 49 | 52 | 55 | 59 |
| DevRoom talks | 0 | 55 | 31 | 27 | 57 | 90 | 155 | 172 | 226 | 240 | 263 | 387 | 416 | 439 | 476 | 536 | 571 | 597 | 661 | 754 | 616 | 625 | 695 | 775 |
| Lightning talks | 0 | 0 | 0 | 0 | 0 | 0 | 28 | 35 | 28 | 32 | 31 | 30 | 36 | 39 | 40 | 38 | 38 | 42 | 42 | 42 | 21 | 19 | 36 | 37 |

* Most profilic speakers in a single year, who gave 3 or more talks in one event

* Your humble narrator's FOSDEM speaking bio :)



## Disclaimer

Errors and omissions, excepted.

Early editions of FOSDEM lacked the formal data structures of now, so some talks are 0 (zero) minutes long!

Some devrooms changed names, and while many have been spotted there's probably still some errors in here. (PRs welcome)


## Running the basic analysis

Ensure you have Node and NPM on your machine then, install the modules with usual:

```
npm install
```

And run the sample analysis with:

```
npm start
```

If you wish some speaker bio data (which isn't all about me!) then use the following syntax, being careful of case:

```
npm start -- -s "Alasdair Kergon"
```

## What's FOSDEM?

To quote the blurb,

> FOSDEM is a free event for software developers to meet, share ideas and collaborate. Every year, thousands of developers of free and open source software from all over the world gather at the event in Brussels. You don't need to register. Just turn up and join in!

Find out more at https://fosdem.org

