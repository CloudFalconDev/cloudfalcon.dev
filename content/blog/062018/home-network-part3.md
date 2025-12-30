---
title: "Home Network Part 3"
date: 2018-06-25
description: Home networking part 3
slug: Home-networking-part-3
authors: mhmdio
tags: [networking, Home]
---

After updating the home network, an issues appeared in Wireless coverage, some of the rooms of my house were having poor wireless coverage, there are many solutions out there to solve this, specially with hardware approach, but these branded solutions is expensive, and I want to use hardware from the shelf to mitigate this issue.


OpenWRT or LEDE custom firmware solutions allows you to use hardware from the shelf to extended your wireless coverage, you can buy cheap broadband routers/AP and flash them with OpenWRT or LEDE and use some of their options to upgrade your wireless network.

I have bought two used TP-Link TL-WR841N/ND devices and flash them with OpenWRT, from my previous post, I used TP-Link WDR4300 as main Wireless AP, and now I want to extended the wireless coverage using the two WR841N.

OpenWrt/LEDE supports various client modes, including:

- bridging using WDS (Wireless Distribution System)
- routed client mode
- bridged client mode implemented only on (old) brcm-2.4 hardware).

Client modes or wireless network bridge or wireless repeater (have different naming) allows you to extend main AP wireless coverage, this needs some manually configurations, and I did the following:

- First I went with routed client mode which is a wireless network bridge with complete network segments separation, this means you need to have your own DHCP server in each network segment, them route your traffic to the main AP from each network segment. This is called Routed Client Mode, cons for this mode is the poor control from you Firewall to the clients connected to the network segment, you will see the new segment as one block only. Routed client mode is supported on most devices, but I did not stick with this due to the lack control from Mikrotik to wireless devices connected to remote network segment.

- WDS - Wireless Distribution System biggest advantage is the Layer 2 transparency enabling bridging and broadcasting across wireless connections - all connected network devices form one common broadcast domain. Now Mikrotik can see all clients connected to the network. I choose this approach since it's fully supported on the TP-Link devices and It allows one DHCP and one network subnet on the whole network.

Links:

- https://wiki.openwrt.org/doc/howto/clientmode
- https://wiki.openwrt.org/doc/recipes/atheroswds
