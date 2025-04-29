export function createSpongebob() {
    // === SpongeBob Group ===
    const spongebobGroup = new THREE.Group();

    // --- Constants for Dimensions ---
    const bodyWidth = 2;
    const bodyHeight = 2.2;
    const bodyDepth = 1;
    const pantsHeight = 0.6;
    const shirtHeight = 0.3;
    const legRadius = 0.15;
    const legHeight = 0.8;
    const armRadius = 0.12;
    const armLength = 1.3; 
    const shoeLength = 0.4;
    const shoeWidth = 0.25;
    const shoeHeight = 0.2;
    const eyeForwardOffset = bodyDepth / 2 + 0.01;

    // --- Materials ---
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFF00, metalness: 0.2, roughness: .9 });
    const pantsMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const shirtMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const legArmMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFF00, metalness: 0.0, roughness: 1.0 });
    const spotMaterial = new THREE.MeshStandardMaterial({ color: 0xDAA520, side: THREE.DoubleSide });
    const beltMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const eyeballMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const irisMaterial = new THREE.MeshStandardMaterial({ color: 0x4682B4 });
    const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const eyelashMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const noseMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFF00, metalness: 0.1, roughness: .9 });    const smileMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); 
    const toothMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const cheekMaterial = new THREE.MeshStandardMaterial({ color: 0xFF8080 });
    const freckleMaterial = new THREE.MeshStandardMaterial({ color: 0xA0522D });
    const shoeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const spatulaHandleMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const spatulaBladeMaterial = new THREE.MeshStandardMaterial({ color: 0xCCCCCC });


    // --- SpongeBob Body ---
    const bodyGeometry = new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyDepth);
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    bodyMesh.position.y = bodyHeight / 2; 
    spongebobGroup.add(bodyMesh);

    // --- Body Outline ---
    const outlineMaterial = new THREE.LineBasicMaterial({ color: 0xCCCC00}); // dark yellow

        const bodyEdges = new THREE.EdgesGeometry(bodyGeometry);
        const bodyOutline = new THREE.LineSegments(bodyEdges, outlineMaterial);
        bodyOutline.position.copy(bodyMesh.position);
        spongebobGroup.add(bodyOutline);

    // --- Pants ---
    const pantsGeometry = new THREE.BoxGeometry(bodyWidth * 1.05, pantsHeight, bodyDepth * 1.05);
    const pantsMesh = new THREE.Mesh(pantsGeometry, pantsMaterial);
    const pantsTopY = -pantsHeight / 2;
    pantsMesh.position.y = pantsTopY;
    spongebobGroup.add(pantsMesh);

    // --- Shirt ---
    const shirtGeometry = new THREE.BoxGeometry(bodyWidth * 1.02, shirtHeight, bodyDepth * 1.02);
    const shirtMesh = new THREE.Mesh(shirtGeometry, shirtMaterial);
    shirtMesh.position.y = pantsTopY + pantsHeight / 2 + shirtHeight / 2;
    spongebobGroup.add(shirtMesh);

    // --- Belt ---
    const beltHeight = 0.08;
    const beltGeometry = new THREE.BoxGeometry(bodyWidth * 1.07, beltHeight, bodyDepth * 1.07);
    const beltMesh = new THREE.Mesh(beltGeometry, beltMaterial);
    beltMesh.position.y = pantsTopY + pantsHeight / 2 + beltHeight / 2;
    beltMesh.position.z = 0.01;
    spongebobGroup.add(beltMesh);

    // --- Legs ---
    const legGeometry = new THREE.CylinderGeometry(legRadius, legRadius, legHeight, 8);
    const legBottomY = pantsMesh.position.y - pantsHeight / 2 - legHeight;

    const leftLegMesh = new THREE.Mesh(legGeometry, legArmMaterial);
    leftLegMesh.position.set(-bodyWidth / 4, pantsMesh.position.y - pantsHeight / 2 - legHeight / 2, 0);
    spongebobGroup.add(leftLegMesh);

    const rightLegMesh = new THREE.Mesh(legGeometry, legArmMaterial);
    rightLegMesh.position.set(bodyWidth / 4, pantsMesh.position.y - pantsHeight / 2 - legHeight / 2, 0);
    spongebobGroup.add(rightLegMesh);

    // --- Shoes ---
    const shoeGeometry = new THREE.BoxGeometry(shoeWidth, shoeHeight, shoeLength);

    const leftShoeMesh = new THREE.Mesh(shoeGeometry, shoeMaterial);
    leftShoeMesh.position.set(leftLegMesh.position.x, legBottomY - shoeHeight / 2, shoeLength / 4);
    spongebobGroup.add(leftShoeMesh);

    const rightShoeMesh = new THREE.Mesh(shoeGeometry, shoeMaterial);
    rightShoeMesh.position.set(rightLegMesh.position.x, legBottomY - shoeHeight / 2, shoeLength / 4);
    spongebobGroup.add(rightShoeMesh);

    // --- Arms + Hands ----------------------------------------------------------
    const armGeometry = new THREE.CylinderGeometry(armRadius, armRadius, armLength, 8);
    const handRadius   = 0.18;

    let leftUpperArmGroup, leftForearmGroup;
    let rightUpperArmGroup, rightForearmGroup;
    let rightHand;

    function buildArm(side = 'L') {
        const upperArmGroup = new THREE.Group(); // new group for upper arm + forearm
    
        const upperArm = new THREE.Mesh(
            new THREE.CylinderGeometry(armRadius, armRadius, armLength * 0.5, 8),
            legArmMaterial
        );
        upperArm.position.y = -armLength * 0.25; 
        upperArmGroup.add(upperArm);
    
        const forearmGroup = new THREE.Group(); // new forearm group
    
        const forearm = new THREE.Mesh(
            new THREE.CylinderGeometry(armRadius, armRadius, armLength * 0.5, 8),
            legArmMaterial
        );
        forearm.position.y = -armLength * 0.25; // move forearm mesh down within its group
        forearmGroup.add(forearm);
    
        // Hand attached to forearm
        const hand = new THREE.Mesh(
            new THREE.SphereGeometry(handRadius, 12, 12),
            legArmMaterial
        );
        hand.position.set(0, -armLength * 0.5, 0); 
        forearmGroup.add(hand);
    
        forearmGroup.position.set(0, -armLength * 0.5, 0); 
        upperArmGroup.add(forearmGroup);
    
        // Position at shoulder
        const x = (side === 'L' ? -1 : 1) * (bodyWidth / 2.27);
        upperArmGroup.position.set(x, bodyMesh.position.y - 0.6, .2);
        upperArmGroup.rotation.set(Math.PI / 2, Math.PI, Math.PI);
    
        return { upperArmGroup, forearmGroup, hand };
    }

    ({ upperArmGroup: leftUpperArmGroup, forearmGroup: leftForearmGroup } = buildArm('L'));
    ({ upperArmGroup: rightUpperArmGroup, forearmGroup: rightForearmGroup, hand: rightHand } = buildArm('R'));

    spongebobGroup.add(leftUpperArmGroup);
    spongebobGroup.add(rightUpperArmGroup);

    // --- Spatula -------
    const handleLength = 1.0;
    const handleRadius = 0.05;
    const bladeWidth = 0.5;
    const bladeHeight = 0.1;
    const bladeLength = 0.2;


    const spatulaGroup  = new THREE.Group();
    const handleGeo  = new THREE.CylinderGeometry(handleRadius, handleRadius, handleLength, 8);
    const bladeGeo  = new THREE.BoxGeometry(bladeWidth, bladeHeight, bladeLength);

    const handleMesh = new THREE.Mesh(handleGeo, spatulaHandleMaterial);
    handleMesh.position.y = -handleLength / 2;               
    spatulaGroup.add(handleMesh);

    const bladeMesh = new THREE.Mesh(bladeGeo, spatulaBladeMaterial);
    bladeMesh.position.set(0, 0, bladeLength / 2); 
    bladeMesh.rotation.x = Math.PI / 2; // Rotate to be flat         
    spatulaGroup.add(bladeMesh);

    spatulaGroup.rotation.set(Math.PI, Math.PI, 0);           
    spatulaGroup.position.set(0, -1, handRadius - .1);
    rightHand.add(spatulaGroup);

    const gui = new dat.GUI();
    const parm = { angleDeg: 0 };              
    const baseL = { x: Math.PI/2, y: Math.PI, z: Math.PI };                      

    // --- Eyes 
    const eyeRadius = 0.3;
    const irisRadius = 0.15; 
    const pupilRadius = 0.08;
    const eyeSeparation = 0.45;
    const eyeVerticalPos = bodyMesh.position.y + 0.25; 
    const lashLength = 0.25;
    const lashWidth = 0.02;

    function createEye() {
        const eyeGroup = new THREE.Group();

        // Eyeball
        const eyeballGeo = new THREE.SphereGeometry(eyeRadius, 16, 16);
        const eyeballMesh = new THREE.Mesh(eyeballGeo, eyeballMaterial);
        eyeGroup.add(eyeballMesh);

        // Iris
        const irisGeo = new THREE.SphereGeometry(irisRadius, 12, 12);
        const irisMesh = new THREE.Mesh(irisGeo, irisMaterial);
        irisMesh.position.z = eyeRadius - 0.11;
        eyeGroup.add(irisMesh);

        // Pupil (Flat Circle)
        const pupilGeo = new THREE.CircleGeometry(pupilRadius, 12);
        const pupilMesh = new THREE.Mesh(pupilGeo, pupilMaterial);
        pupilMesh.position.z = irisMesh.position.z + irisRadius * 0.3 + 0.01;
        eyeGroup.add(pupilMesh);

        // Eyelashes --- ADJUSTED ROTATION ---
        const lashGeo = new THREE.BoxGeometry(lashWidth, lashLength, lashWidth); // Length is Y
        const lashAngles = [Math.PI / 5, 0, -Math.PI / 5]; // Angles relative to vertical (Z rotation)
        const lashTiltX = -Math.PI / 10; // Tilt lashes slightly back/up off the eye surface

        lashAngles.forEach((angleZ) => {
            const eyelashMesh = new THREE.Mesh(lashGeo, eyelashMaterial);

            // Position origin slightly above the eye surface along the top arc
            const lashDist = eyeRadius - .05; // Distance from eye center to base of lash
            const baseAngle = Math.PI/2 + angleZ; // Angle from positive X axis to place lash base
            const baseY = Math.sin(baseAngle) * lashDist;
            const baseX = Math.cos(baseAngle) * lashDist;

             // Place center of the lash slightly out from base position along its intended direction
             const lashCenterOffset = lashLength / 2;
             const offsetY = Math.cos(angleZ) * lashCenterOffset;
             const offsetX = -Math.sin(angleZ) * lashCenterOffset;


            eyelashMesh.position.set(baseX + offsetX, baseY + offsetY, 0.02); // Position center, slightly forward

            // Apply rotations: Z for fanning, X for tilt back
            eyelashMesh.rotation.x = lashTiltX;
            eyelashMesh.rotation.z = angleZ; // Fan out around Z axis

            eyeGroup.add(eyelashMesh);
        });

        return eyeGroup;
    }

    const leftEye = createEye();
    leftEye.position.set(-eyeSeparation, eyeVerticalPos, eyeForwardOffset);
    spongebobGroup.add(leftEye);

    const rightEye = createEye();
    rightEye.position.set(eyeSeparation, eyeVerticalPos, eyeForwardOffset);
    spongebobGroup.add(rightEye);


    // --- Nose 
    const noseLength = 1.0; 
    const noseRadius = 0.08;
    const noseGeo = new THREE.CylinderGeometry(noseRadius, noseRadius, noseLength, 8);
    const noseMesh = new THREE.Mesh(noseGeo, noseMaterial);
    noseMesh.position.set(0, eyeVerticalPos - eyeRadius * 0.8, bodyDepth / 2); 
    noseMesh.rotation.x = Math.PI / 2;
    spongebobGroup.add(noseMesh);

    // --- Smile & Teeth -
    const smileRadius = 0.55; 
    const smileTubeRadius = 0.02; 
    const smileArc = Math.PI; 
    const smileVerticalPos = bodyMesh.position.y - .2; // ADJUSTED fixed position (was relative)

    const smileGeo = new THREE.TorusGeometry(smileRadius, smileTubeRadius, 8, 32, smileArc); // Increased segments
    const smileMesh = new THREE.Mesh(smileGeo, smileMaterial);
    smileMesh.position.set(0, smileVerticalPos, bodyDepth / 2 + 0.02); // Z offset adjusted
    smileMesh.rotation.x = -Math.PI / 20; // Fine-tuned tilt
    smileMesh.rotation.z = Math.PI; // Flip torus segment to curve upwards
    spongebobGroup.add(smileMesh);

    // Teeth 
    const toothWidth = 0.15;
    const toothHeight = 0.2;
    const toothDepth = 0.05;
    const toothGeo = new THREE.BoxGeometry(toothWidth, toothHeight, toothDepth);
    const toothSeparation = 0.1;
    const toothVerticalOffset = -0.56; // How far below the smile center line


    const leftToothMesh = new THREE.Mesh(toothGeo, toothMaterial);
    leftToothMesh.position.set(-toothSeparation, smileVerticalPos + toothVerticalOffset, bodyDepth / 2 - 0.01); // Adjusted Y relative to new smile pos
    spongebobGroup.add(leftToothMesh);

    const rightToothMesh = new THREE.Mesh(toothGeo, toothMaterial);
    rightToothMesh.position.set(toothSeparation, smileVerticalPos + toothVerticalOffset, bodyDepth / 2 - 0.01); // Adjusted Y relative to new smile pos
    spongebobGroup.add(rightToothMesh);


    // --- Cheeks & Freckles 
    const cheekRadius = 0.15;
    const cheekVerticalPos = smileVerticalPos + 0.05; // Relative to smile
    const cheekSeparation = smileRadius + cheekRadius * 0.5; // Relative to smile radius
    const cheekForwardOffset = bodyDepth / 2 + 0.03; // Further offset
    const freckleRadius = 0.02;

    function createCheek() {
        const cheekGroup = new THREE.Group();
        const cheekGeo = new THREE.CircleGeometry(cheekRadius, 16);
        const cheekMesh = new THREE.Mesh(cheekGeo, cheekMaterial);
        cheekGroup.add(cheekMesh);

        const frecklePositions = [
            { x: 0, y: 0.05, z: freckleRadius },
            { x: -0.06, y: -0.04, z: freckleRadius },
            { x: 0.06, y: -0.04, z: freckleRadius }
        ];
        const freckleGeo = new THREE.SphereGeometry(freckleRadius, 6, 6);
        frecklePositions.forEach(pos => {
            const freckleMesh = new THREE.Mesh(freckleGeo, freckleMaterial);
            freckleMesh.position.set(pos.x, pos.y, pos.z + 0.01);
            cheekGroup.add(freckleMesh);
        });
        return cheekGroup;
    }

    const leftCheek = createCheek();
    leftCheek.position.set(-cheekSeparation, cheekVerticalPos, cheekForwardOffset);
    spongebobGroup.add(leftCheek);

    const rightCheek = createCheek();
    rightCheek.position.set(cheekSeparation, cheekVerticalPos, cheekForwardOffset);
    spongebobGroup.add(rightCheek);


    // --- Spots --- 
    const spotRadius = 0.15;
    const spotGeometry = new THREE.CircleGeometry(spotRadius, 8);
    const spotsData = [
        // Right side
        { x: 1, y: 1.6, z: bodyDepth / 2 - .2, ry: Math.PI/2},
        { x: 0.5, y: 1.0, z: bodyDepth / 2 + 0.01 },
        { x: 0.7, y: 0.4, z: bodyDepth / 2 + 0.01 },
    
        // Left side
        { x: -0.7, y: 1.6, z: -bodyDepth / 2 - 0.01, ry: Math.PI },
        { x: -1, y: 0.4, z: -bodyDepth / 2 +.2, ry: Math.PI / 2},
    
        // Random backside
        { x: 0.5, y: 1.2, z: -bodyDepth / 2 - 0.01, ry: Math.PI },
        { x: -0.3, y: 1.0, z: -bodyDepth / 2 - 0.01, ry: Math.PI },
    
        
    ];
    spotsData.forEach(data => {
        const holeGeometry = new THREE.SphereGeometry(spotRadius, 16, 16);
        const holeMaterial = new THREE.MeshStandardMaterial({ color: 0x333300, metalness: 0.0, roughness: 1.0 }); // dark brown, matte
        const holeMesh = new THREE.Mesh(holeGeometry, holeMaterial);
    
        holeMesh.scale.z = 0.5; // squash depth for flat indent look
        holeMesh.position.set(data.x, data.y, data.z);
    
        if (data.ry) { 
            holeMesh.rotation.y = data.ry;
        }
    
        spongebobGroup.add(holeMesh);
    });

    // === Final Group Positioning ===
    const lowestPoint = legBottomY - shoeHeight;
    spongebobGroup.position.y = -lowestPoint;

    return {
        group: spongebobGroup,
        leftUpperArmGroup,
        leftForearmGroup,
        rightUpperArmGroup,
        rightForearmGroup
      };
}