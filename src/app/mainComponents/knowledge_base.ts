export var Knowledge = {

    
    "engine": [
        // ["key", "phrase", "key if yes", "key if no", "problem"] || ["key", "solution"] || ["key", "Problem", "Problem for Appointment", Price]

        //if array length == 5, show book appointment button instead of yes and no

        //if array length == 2, show "diagnose again?" button
        // "", key, key
        // "", "PROBLEM", 1000

        [0,"Does the car start?", 4, 2],
        // [1,"Is there steam coming out of the system?",3,4],
        [2, "Wait for 15 seconds and restart again, Does the car start?", 4, 19],
        // [3, "Is there steam coming out of the system?", 4, 5],
        [4, "Is the steam coming out of the hood?", 6, 7],

        [5, "No additional repair needed"],

        [6, "Stop the car in a safe place, the car is overheated"],
        [7, "Is the 'high engine coolant' icon light present?", 6, 8],
        [8, "Is there a 'pinging' noise related to the engine?", 9, 10],
        [9, "The noise is caused by an air/fuel mixture in the engine cylinder being ignited prematurely by the heat of compression as the piston is moving up on the compression stroke.", -1, "Engine cylinder problem", 1000], //Problem
        [10, "Are there rough idling sounds with inconsistent tachometer counts?", 11, 12],
        [11, "Sounds caused by damage or incorrectly installed spark plugs", -1, "Spark plug problem", 500], //Problem
        [12, "Is the oil light on the dashboard lit?", 13, 14],
        [13, "Fill appropriate oil for vehicle"],
        [14, "Does your vehicle have low power?", 15, 17],
        [15, "Your fuel filter is clogged. After clearing, does is still have appreciable loss of power?", 16, 5],
        [16, "Fuel line/piper problem", -1, "Fuel line replacement", 3000], //Problem
        [17, "Are there any fuel leaks?", 18, 5],
        [18, "Check A/C",-1, "A/C Repair", 1800], //Problem
        [19, "Does your car come with a F.A.S.T key and have you equipped it?", 20, 21],

        [20, "Does it now start?", 4, 22],

        [21, "Does your car have 'Smart Entry System' or a CVT/Automatic Transmission? \
        If yes, have you made sure the gear selector is in the 'P' position, and preseed the engine switch while pressing on the brakes? \
        If no, have you pressed and held the clutch, and then press the engine switch while depressing the brake pedal?", 20, 20],
        [22, "Check for battery replacement and if steering wheel is unlocked. Does the Engine switch off automatically?", 23, 24],
        [23, "Your vehicle might be in 'Accessory' or 'Ignition' On mode"],
        [24, "Is the immobilizer system blinking when the vehicle is on 'Ignition On' mode?", 25, 5],
        [25, "Something is wrong with the immobilizer system",-1, "Car immobilizer service", 2000] //Problem
    ],
    
    "safety": [
        [0, "Is the drive belt too loose?", 1, 2],
        [1, "Check for insufficient battery charging, engine overheating, poor power steering, poor air conditioning, or excessive belt wear",-1, "Car Repair", 20000], //Problem
        [2, "Does a warning buzzer sound during driving?", 3, 4],
        [3, "First, check if the driver and the front passenger are wearing the seat belts. \
            Check if the seat belt reminder light is flashing. You can also check if the parking brake indicator is on, or if the parking brake is released."],
        [4, "Is there a change in exhaust sound?", 5, 6],

        [5, "This may indicate a dangerous carbon monoxide leak, and drive with the windows open and have the exhaust system checked immediately.",-1, "Exhaust system problem", 5000], //Repair

        [6, "Is there excessive tire squealing when cornering?", 5, 7],
        [7, "Check if the steering and/or suspension elements need lubrication.",-1, "Steering/Suspension problem", 500]
    ],

    "brake": [
        [0, "Do the brakes work uniformly on all wheels?", 1, 2],
        [1, "Is there excessive pedal travel?", 2, 3],

        [2, "Have the brake system inspected. Otherwise, check brake lines, as they could be damaged, there could be air in them, or they could also be damaged or leaking.",-1, "Brake system repair", 5000], //Problem

        [3, "Is there excessive brake dragging?", 2, 4],
        [4, "Is there excessive pedal noise?", 2, 5],
        [5, "Does the pedal pulsate when depressed?", 2, 6],
        [6, "Is there a spongy feeling when using the brakes?", 2, 7],
        [7, "Do the pedals almost touch the floor?", 2, 8],
        [8, "Is there poor braking performance?", 2, 9],
        [9, "Did the car pass through a puddle or a stream, leading to brakes functioning improperly?", 10, 11],
        [10, "Dry out the brakes by driving slowly while lightly pressing the brake pedal."],
        [11, "Does the vehicle pulls heavily to one side when braking?", 2, 12],
        [12, "Check the other categories."]
    ],

    "transmission": [
        [0, "Does the continuously variable transmission (CVT) makes shift changes when accelerating and the initial movement of the vehicle is slow when the vehicle starts moving?", 1, 2],
        [1, "Can you shift the selector lever from the “P” (PARK) position?", 3, 11],
        [2, "There may be a problem in the CVT",-1, "CVT Transmission problem", 20000], //Problem
        [3, "Can your shift lever be shifted from P even if you depress the brake pedal for CVT?", 4, 10],
        [4, "Does the car have smart entry?", 5, 8],
        [5, "Can the steering wheel be turned after the engine is stopped?", 6, 7],
        
        [6, "Check other categories"],

        [7, "Know that this is locked to prevent theft of the vehicle if the key is pulled from the engine switch."],
        [8, "Can the steering wheel be turned after the engine is stopped?", 6, 9],
        [9, "Know the car is locked automatically to prevent theft of the vehicle."],
        [10, "You cannot release the shift lever by depressing the brake pedal with the engine switch in the “ON” position. Check for repairs.",-1, "Transmission problem", 15000], //Problem
        [11, "Shift the selector lever while pressing the brake pedal. Can you shift the selector lever from the “P” (PARK) position?", 12, 13],

        [12, "No repairs needed."],

        [13, "Check that the ignition switch or the operation mode is in ON."]
    ],

    "chassis": [
        [0, "Does the vehicle pulls heavily to one side when driving on a level road?", 1, 2],
        [1, "There is improper wheel alignment.",-1, "Wheel alignment", 300], //Problem
        [2, "Are there strange noises related to the suspension system?", 3, 4],
        [3, "These are caused by worn out or damaged suspension bushings", "PROBLEM", 1000],
        [4, "Check the other categories."]
    ],

    "electrical": [
        [0, "Does the F.A.S.T key operate for your vehicle?", 1, 2],
        [1, "Check other categories."],
        [2, "Use the emergency key to lock and unlock the door, and insert the F.A.S.T.-key into the key slot of the floor console, and then start the engine or change the operation mode."]
    ]
}