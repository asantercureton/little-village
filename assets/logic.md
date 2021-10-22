# Game Logic

Laying out how the game works. Not finalized. Questions and potential ideas are in *italics*.

## Table of Contents:

- [Users](#users)
- [Villages](#villages)
- [Resources and Tasks](#resources-and-tasks)
- [Trading](#trading)
- [Brainstorming](#brainstorming)

<hr/>

## Users

### Sign Up/Create New User:
- name (*or username?*)
- email
- password
- prompted to create village:
    - village name
    - *if we have king/queen titles, they would need to choose which one, or we can use a neutral title*
    - *ability to choose resource to be more abundant in*

<hr/>

## Villages

### New Village Starter Stats
- state = tribe
- village name
- user/ruler's name
- resources: fruit, meat, lumber, gold
    - ? resources set to 0 to start
- abundance values for each resource
- starting population = ? (less than 10)

### Village States:
- tribe (max pop. = 10)
- hamlet (max pop. = 25)
- village (max pop. = 50)
- town (max pop. = 100)
- citystate (max pop. = 175)
- kingdom (max pop. = 250)

### Each State has:
- name of state
- max population
- image/map
- resources required to level up to next state
- *new multiplier for efficiency (better level = better efficiency)*


<hr/>

## Resources and Tasks

### Resources
- Fruit:
    - increase by farming
    - decrease when you spend it to buy more population
- Meat:
    - increase by hunting
    - decrease when you spend it to buy more population
- Gold:
    - increase by mining
    - decrease when you spend it to buy upgrades (increase efficiency)
- Lumber:
    - increase by gathering wood
    - decrease when you spend it to buy upgrades (increase efficiency)

### Population:
- number of population
- number of population assigned to each task:
    - % hunting
    - % farming
    - % gathering
    - % mining
    - % unassigned

### Tasks:
- assign villagers to tasks
- tasks yield resources after x amount of time
- resource yield is multiplied by efficiency (upgrades), abundance, and number of workers
- when you assign a villager to this task, they continue to do it until reassigned

### Each Task has:
- base # of yielded resources
- time interval it takes to yield resources


<hr/>

## Trading

### Trading Board:
- users can post trades to the board
- form where users must choose how much of a resource to offer, and how much to request
- when trade is accepted, each user loses/receives the traded resources
- *users can edit/cancel the trade after posting it*

### Trade Requirements:
- date/time posted
- offered resource
- requested resource
- offering user
- accepting user

### Questions About Trading?
- *the chosen amount is put on hold until the trade is either accepted or canceled (so they can't spend resources they've put up for trade and cause an error)*
- *when user2 accept a trade offer from user1's post, does user1 need to confirm the trade before the trade goes through, or is it assumed they agree with the trade since they set the terms*
    

<hr/>

## Brainstorming

### Streamline Food Resource
- potentially combine fruit/meat into one spendable food resource
- hunting vs farming could both contribute to food resource
    but with different yields over time
- for example:
    - fruit can take longer but yields more food
    - hunting requires less assigned villagers but yields less food

### User Ideas
- user can have multiple villages, accessed from their account page
    - problem: could you trade with your own other village?
- user can change their account information from account page
    - potentially delete their village so they can start a new one
    - edit their village's name
- have a history of accepted trades
- ability to friend a user
    - ability to make direct trades with friends