# Data Structures

## Map

### Description

Map is an array of cells known as `Square`s, addressable with a 2d vector `(x, y)`

In our case, the array is actually represented by 1d array, but we calculate offset when accessing it.

## Square
has the following core attributes:
- `squareType` string, differentiating walls from floor
- `Entity` reference, if there is any on it. This allows for easy targetting of entities on given square.

also has:
- inventory, so it can hold any amount of `Item`s
- `blood` level counter
- state-related flags
  - isLit
  - isInTwilightZone
- interface-related flags, which should not be in the `gameModel`, but could be in the `gameInterface` model
  - isAvailableDestination
  - isChosenDestination
  - isTargeted


