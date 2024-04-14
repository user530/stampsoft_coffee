[![en](https://img.shields.io/badge/Language-EN-blue.svg)](https://github.com/user530/stampsoft_coffee/blob/master/README.md)
[![ru](https://img.shields.io/badge/Language-RU-red.svg)](https://github.com/user530/stampsoft_coffee/blob/master/README.md)

# VENDING EMULATOR (Prototype)
### Test Assignment for Stampsoft
Development of a coffee / vending machine UI with emulation
### ADAPTED: SCREEN RESOLUTION - 1080х1920, BROWSER - Google Chrome
## Features:
- Offering users a selection of products from various categories
- Each product has several primary options (drink size), additional options (syrups), and data on the preparation process
- Vending storage contains information about the stock of each product
- The total amount of the order is determined by the selected product, its size (modifier), and the set of additional options
- Two payment options: cash and card
- Emulation of the payment process: ability to insert funds, confirm and cancel (also includes card removal/cash return simulation)
- Visualization of the preparation process (considering the product and selected additional options)
- Modifying product data (decreasing stocks) and saving order history

## Short guide:
##### 1. Promo Screen
Just a small advertising poster, nothing special. Interaction with the screen leads the user to the product selection screen.
##### 2. Product Selection Screen
This screen allows the user to familiarize themselves with the assortment and choose the desired product (including drink size and additional options). If there's no user activity for a prolonged period (10 seconds by default), it returns to the promo display.
The displayed information is taken from the vending machine storage data such as name, picture, base price, etc. Information about the remaining stock was not present in the design and was added for more convenient testing (storage changes and storage quantity accounting for establishing a successful or failed outcome).
##### 3. Payment Method Selection Screen
Allows the user to choose a payment method or cancel the current order.
##### 4. Cash Payment Screen
Emulates the cash input process:
- Pressing key "1" simulates inserting a 10 ruble note
- Pressing key "2" simulates inserting a 50 ruble note
- Pressing key "3" simulates inserting a 100 ruble note

For user convenience, both the amount due and the amount inputed are visualized. Upon confirming/cancelling the operation, the user is simulated a cash return (console message).
##### 5. Card Payment Screen
Emulates the process of paying with a bank card. Non-cash payment involves an initial check of all data, and if the card is valid, it triggers the PIN confirmation procedure.
- Pressing key "1" simulates entering a working card that will pass all stages of verification
- Pressing key "2" simulates entering a card that will fail the first check
- Pressing key "3" simulates entering a card that will fail the second check
- Pressing key "4" simulates entering a card that will fail the third check
- Pressing key "5" simulates entering a card that will fail the fourth check

Since this operation is asynchronous, cancelling the initiated procedure registers aт "interrupt" operation request, which will take effect after all stages of the verification are complete. An uncancelled operation that passes the check will require PIN confirmation.

- A PIN value less than 5000 simulates a confirmation error
- A PIN value greater than 5000 simulates successful confirmation

Upon confirmation/cancellation of the operation, the user is simulated a card return (console message). A successful operation also reduces the product stock and adds the order information to the history.
##### 6. Failed / Cancelled Payment Screen
Shows the user the reason for failure (or cancellation) and allows them to either retry the product or cancel the operation.
##### 7. Successful Payment Screen
Shows the user a notification of successful payment and, after a set delay (default 3 seconds), transitions to the drink preparation process.
##### 8. Product Preparation Screen
Emulates the drink preparation and displays the stages of this process. The stages and preparation time for each product are set dynamically (default 5 seconds per step). The total preparation time consists of the time to prepare the product itself and "additional" time for each selected option (time proportional to the amount of the option).
##### 9. Dispensing Screen
Shows the user a notification about the completion of preparation and, after a set delay (default 3 seconds), returns to the promo screen.
##### 10. Failed Dispensing Screen
Shows the user a notification about the absence of the product (or insufficient volume to fulfill the order)
