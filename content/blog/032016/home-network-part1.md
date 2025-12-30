---
title: "Home Network Part 1"
date: 2016-03-17
description: Home networking part 1
slug: Home-networking-part-1
authors: mhmdio
tags: [networking, Home]
---

one of the first things I decide to do this year was upgrading my home network, ADSL connection using PPPOE, Wireless 802.11n access, nothing fancy here.


After a quick google search (reddit reading) I choose to use DD-WRT, the TP-link ADSL Router firmware can’t get me anywhere, no DNS cache, no DDNS for different services, no VPN, no SSH access, nothing, just a dull firmware.

So, I will start a series that describe the processes I followed to upgrade my home network, from ADSL to DD-WRT to OpenWRT

Old topology:

Just a TD-W8901n ADSL Router, connect to the modem cable.

I want to test custom firmware for Routers before doing any thing, although most ADSL chips is still closed source code, so neither dd-wrt, nor openWRT support ADSL Routers ( except one type or two). I searched for most economic router to start with and it was TL-WR741ND

After that i notice the that this dd-wrt on this router came with very limited feature compare to the huge capitalize of the dd-wrt it self.

For advance network engineer, openWRT will be better option as it offers package manager, and you can customize your router as much as your cpu/ram/storage can take.
