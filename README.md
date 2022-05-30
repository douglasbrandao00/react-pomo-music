# Pomodoro Music
### react | react hooks | chakraUI | pomodoro | youtube api | type to search

You can checkou this app in: https://react-pomo-music.vercel.app/
## Table of Contents
1. [Introduction](#Introduction)
2. [Coolest features](#Coolest-features)
3. [Screenshot](#Screenshot)
4. [How to Install and Run the Project](#How-to-Install-and-Run-the-Project)

## Introduction
PomoMusic has born of a personal need of join the awesome time structure of
pomodoro tecnic with need of hear music to isolate me of the "external world"

I've decided to buid this app insted of combine some others,
to study some intresting technologies such as: youtube api, CakraUI a react hooks

The coolest thing in this app so far was interact with youtube api,
the concepts of quotas, and how make the bes use of it, the capacity of specify the fiels i'm wanted in querystring
and the mechanism of type to search with debounce functions

Since this app is alfa, there are some critical decision that i've made.
Especially the auth method, for the time sake i left the youtube key hardcoded since is
a limited and free account and this project is only for practice sake.
Although this shoud be replaced by a google's 0Auth authentication in future interactions

## Coolest features
 - Customizable Pomodoro Timer
 - Youtube integration with type to search
 
## Screenshot
![app_home](https://user-images.githubusercontent.com/22304456/171064437-daf0587e-7d7e-4f69-90c6-3cacfb037958.png)
![app_search](https://user-images.githubusercontent.com/22304456/171064440-9da32bf1-e6b7-443f-9839-56c5d5ad9081.png)
![app_player](https://user-images.githubusercontent.com/22304456/171064441-414aa2d4-f933-4a54-9ec8-358820a2514d.png)
![app_custom_timer](https://user-images.githubusercontent.com/22304456/171064444-64f79ff6-e479-45ff-b9af-a03ac7700547.png)

## How to Install and Run the Project
Clone this project into your computer:
```
git clone https://github.com/douglasbrandao00/react-pomo-music.git
```

cd into it:
```
cd react-pomo-music
```

install dependencies:
```
yarn install
```

and finally, run it:
```
yarn dev
```
