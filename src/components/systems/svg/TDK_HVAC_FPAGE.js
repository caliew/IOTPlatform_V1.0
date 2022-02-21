import React, { useContext,useEffect,useState } from 'react'
import {
	CHILLER_A_CHS_PRESS1,CHILLER_A_CHS_PRESS2,
	CHILLER_B_CHS_PRESS1,CHILLER_B_CHS_PRESS2,
	AHU_A_CHS_PRESS,AHU_B_CHS_PRESS,
	CHILLER_A_CHR_PRESS,CHILLER_B_CHR_PRESS,
	AHU_A_CHR_PRESS1,AHU_A_CHR_PRESS2,
	AHU_B_CHR_PRESS1,AHU_B_CHR_PRESS2,
	CHILLER_A_CWS_PRESS1,CHILLER_A_CWS_PRESS2,
	CHILLER_B_CWS_PRESS1,CHILLER_B_CWS_PRESS2,
	WCPU_A_CWR_PRESS1,WCPU_A_CWR_PRESS2,
	WCPU_B_CWS_PRESS1,WCPU_B_CWS_PRESS2,
	CTW_A_CWS_PRESS1,CTW_A_CWS_PRESS2,
	CTW_B_CWS_PRESS1,CTW_B_CWS_PRESS2,
	CHILLER_A_CWR_PRESS,CHILLER_B_CWR_PRESS,
	WCPU_A_CWS_PRESS,WCPU_B_CWR_PRESS,
	CTW_A_CWR_PRESS,CTW_B_CWR_PRESS,
  CTW_A_TEMP1,CTW_A_TEMP2,
  CTW_B_TEMP1,CTW_B_TEMP2,
  WCPU_A_TEMP1, WCPU_A_TEMP2,
  WCPU_B_TEMP1, WCPU_B_TEMP2,
  AHU_A_TEMP1,AHU_A_TEMP2,
  AHU_B_TEMP1,AHU_B_TEMP2,
  CHILLER_A_CH_TEMP1, CHILLER_A_CH_TEMP2,
  CHILLER_A_CW_TEMP1, CHILLER_A_CW_TEMP2,
  CHILLER_B_CH_TEMP1, CHILLER_B_CH_TEMP2,
  CHILLER_B_CW_TEMP1, CHILLER_B_CW_TEMP2,
	AIR_COMPRESSOR1,AIR_COMPRESSOR2,AIR_COMPRESSOR3,
	AIRFLOW_RH1,AIRFLOW_RH2,AIRFLOW_RH3,
	AIRFLW_VEL1,AIRFLW_VEL2,AIRFLW_VEL3,AIRFLW_VEL4,AIRFLW_VEL5,
	AIRFLW_VEL6,AIRFLW_VEL7,AIRFLW_VEL8,AIRFLW_VEL9,AIRFLW_VEL10,
	PWRMTR_01,PWRMTR_02,PWRMTR_03,PWRMTR_04,PWRMTR_05,
	PWRMTR_06,PWRMTR_07,PWRMTR_08,PWRMTR_09,PWRMTR_10,
	PWRMTR_11,PWRMTR_12,PWRMTR_13,PWRMTR_14,PWRMTR_15,
	PWRMTR_16,PWRMTR_17,PWRMTR_18,PWRMTR_19,PWRMTR_20,
	PWRMTR_21,PWRMTR_22,PWRMTR_23,PWRMTR_24,PWRMTR_25,
	PWRMTR_26,PWRMTR_27,PWRMTR_28,PWRMTR_29
} from '../../types';

import { MDBCol,MDBCard } from 'mdbreact';
// import { ReactComponent as SVGPLOT3} from '../svg/files/TDK_FPAGE_4.svg';
import { ReactComponent as SVGPLOT3} from '../svg/files/TDK_FPAGE_9.svg';
import { ReactComponent as SVGFPLAN} from '../svg/files/TDK_FPAGE_FLOORPLAN_3D.svg';
import AuthContext from '../../../context/auth/authContext';
// 
// REFERENCE SVG DATA FROM 
// '../components/svg/TDK_ISOVIEW.svg'

function TDK_IsoVIEW({ color, sensorsData, systemComponent, handleComponetSelection }) {
	// --------------------------
  const authContext = useContext(AuthContext);
	// --------------------------------------
	const [counter,setCounter] = useState(0);
	// --------------------------------------
	const [colorRed1,setColorRed1] = useState('red');
	const [colorRed2,setColorRed2] = useState('white');
	const [colorBlue1,setColorBlue1] = useState('blue');
	const [colorBlue2,setColorBlue2] = useState('white');
	const [colorYellow1,setColorYellow1] = useState('yellow');
	const [colorYellow2,setColorYellow2] = useState('white');
	const [colorGreen1,setColorGreen1] = useState('green');
	const [colorGreen2,setColorGreen2] = useState('white');
	// --------------
	useEffect(()=>{
		// ---------
		// SET TIMER
		// ---------
		const _mTimer = setTimeout(() => {
			// ----------
			setColorRed1(colorRed1 === 'red' ? 'white' : 'red' );
			setColorRed2(colorRed2 === 'red' ? 'white' : 'red' );
			setColorBlue1(colorBlue1 === 'blue' ? 'white' : 'blue' );
			setColorBlue2(colorBlue2 === 'blue' ? 'white' : 'blue' );
			setColorYellow1(colorYellow1 === 'yellow' ? 'black' : 'yellow' );
			setColorYellow2(colorYellow2 === 'yellow' ? 'black' : 'yellow' );
			setColorGreen1(colorGreen1 === 'green' ? 'white' : 'green' );
			setColorGreen2(colorGreen2 === 'green' ? 'white' : 'green' );
			// ----------
			setCounter(counter > 30 ? 0 : counter + 1);
			// ---------
		}, 1000);
		return () => clearTimeout(_mTimer);
	})
	// --------------
	const sysCHILLER = 'CHILLER';
	const sysAHU = 'AHU';
	const sysWCPU = 'WCPU'
	const sysCTW = "CTW"
	const pumpCHILLER = "CHILLER PUMP";
	const pumpCTW = "CTW PUMP";
	const pumpAHU = "AHU PUMP"
	// --------------------------------------------
	// fill='green' stroke='black' stroke-width='1'
	// --------------------------------------------
	// console.log(`${CTW_A_CWS_PRESS1}....${sensorsData[CTW_A_CWS_PRESS1]}`);
	// console.log(sensorsData);
	// ----------------------
	const DrawREDLine = () => {
		return (
			<g transform="translate(15.0,20.0) scale(1.0,1.0)" fill={color} >
				<circle cx="522" cy="670" r='5' stroke="red" stroke-width="3" fill={getREDColor2()} />
				<circle cx="537" cy="630" r='5' stroke="red" stroke-width="3" fill={getREDColor1()} />
				<circle cx="555" cy="590" r='5' stroke="red" stroke-width="3" fill={getREDColor2()} />
				<circle cx="570" cy="550" r='5' stroke="red" stroke-width="3" fill={getREDColor1()} />
				<circle cx="584" cy="516" r='5' stroke="red" stroke-width="3" fill={getREDColor2()} />
				<circle cx="615" cy="516" r='5' stroke="red" stroke-width="3" fill={getREDColor1()} />
				<circle cx="641" cy="516" r='5' stroke="red" stroke-width="3" fill={getREDColor2()} />
				<circle cx="756" cy="516" r='5' stroke="red" stroke-width="3" fill={getREDColor1()} />
				<circle cx="787" cy="516" r='5' stroke="red" stroke-width="3" fill={getREDColor2()} />
				<circle cx="782" cy="550" r='5' stroke="red" stroke-width="3" fill={getREDColor1()} />
				<circle cx="777" cy="590" r='5' stroke="red" stroke-width="3" fill={getREDColor2()} />
				<circle cx="771" cy="630" r='5' stroke="red" stroke-width="3" fill={getREDColor1()} />
				<circle cx="767" cy="670" r='5' stroke="red" stroke-width="3" fill={getREDColor2()} />
				<circle cx="800" cy="516" r='5' stroke="red" stroke-width="3" fill={getREDColor1()} />
				<circle cx="804" cy="488" r='5' stroke="black" stroke-width="3" fill={getREDColor2()} />
			</g>
		)
	}
	const DrawBLUELine = () => {
		return (
			<g transform="translate(0.0,0.0) scale(1.0,1.0)" fill={color} >
				<circle cx="630" cy="826" r='5' stroke="black" stroke-width="1" fill={getBLUEColor1()} />
				<circle cx="700" cy="826" r='5' stroke="black" stroke-width="1" fill={getBLUEColor2()} />
				<circle cx="760" cy="825" r='5' stroke="black" stroke-width="1" fill={getBLUEColor1()} />
				<circle cx="931" cy="822" r='5' stroke="black" stroke-width="1" fill={getBLUEColor2()} />
				<circle cx="933" cy="790" r='5' stroke="black" stroke-width="1" fill={getBLUEColor1()} />
				<circle cx="933" cy="760" r='5' stroke="black" stroke-width="1" fill={getBLUEColor2()} />
				<circle cx="980" cy="758" r='5' stroke="black" stroke-width="1" fill={getBLUEColor1()} />
				<circle cx="965" cy="740" r='5' stroke="black" stroke-width="1" fill={getBLUEColor2()} />
				<circle cx="1030" cy="758" r='5' stroke="black" stroke-width="1" fill={getBLUEColor2()} />
				<circle cx="1015" cy="740" r='5' stroke="black" stroke-width="1" fill={getBLUEColor1()} />
				<circle cx="1080" cy="758" r='5' stroke="black" stroke-width="1" fill={getBLUEColor1()} />
				<circle cx="1065" cy="740" r='5' stroke="black" stroke-width="1" fill={getBLUEColor2()} />
				<circle cx="1119" cy="739" r='5' stroke="black" stroke-width="1" fill={getBLUEColor1()} />
				<circle cx="1112" cy="780" r='5' stroke="black" stroke-width="1" fill={getBLUEColor2()} />
				<circle cx="1090" cy="700" r='5' stroke="black" stroke-width="1" fill={getBLUEColor1()} />
				<circle cx="1078" cy="647" r='5' stroke="black" stroke-width="1" fill={getBLUEColor2()} />
				<circle cx="1110" cy="647" r='5' stroke="black" stroke-width="1" fill={getBLUEColor1()} />
				<circle cx="1110" cy="596" r='5' stroke="black" stroke-width="1" fill={getBLUEColor2()} />
				<circle cx="1060" cy="596" r='5' stroke="black" stroke-width="1" fill={getBLUEColor1()} />
				<circle cx="1045" cy="540" r='5' stroke="black" stroke-width="1" fill={getBLUEColor2()} />
				<circle cx="1090" cy="539" r='5' stroke="black" stroke-width="1" fill={getBLUEColor1()} />
				<circle cx="1140" cy="539" r='5' stroke="black" stroke-width="1" fill={getBLUEColor2()} />
				<circle cx="1220" cy="605" r='5' stroke="black" stroke-width="1" fill={getBLUEColor1()} />
				<circle cx="1300" cy="603" r='5' stroke="black" stroke-width="1" fill={getBLUEColor2()} />
				<circle cx="1400" cy="603" r='5' stroke="black" stroke-width="1" fill={getBLUEColor1()} />
				<circle cx="1400" cy="555" r='5' stroke="black" stroke-width="1" fill={getBLUEColor2()} />
				<circle cx="1304" cy="532" r='5' stroke="black" stroke-width="1" fill={getBLUEColor1()} />
				<circle cx="1270" cy="480" r='5' stroke="black" stroke-width="1" fill={getBLUEColor2()} />
				<circle cx="1220" cy="400" r='5' stroke="black" stroke-width="1" fill={getBLUEColor1()} />
				<circle cx="1184" cy="340" r='5' stroke="red" stroke-width="1" fill={getBLUEColor2()} />
		</g>
		)		
	}
	const DrawYELLOWLine = () => {
		return (
			<g transform="translate(0.0,0.0) scale(1.0,1.0)" fill={color} >
				<circle cx="657" cy="750" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor1()} />
				<circle cx="655" cy="725" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
				<circle cx="653" cy="696" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor1()} />
				<circle cx="600" cy="696" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
				<circle cx="530" cy="696" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor1()} />
				<circle cx="480" cy="696" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
				<circle cx="430" cy="696" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor1()} />
				<circle cx="380" cy="696" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
				<circle cx="330" cy="696" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor1()} />
				<circle cx="340" cy="725" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
				<circle cx="350" cy="750" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor1()} />
				<circle cx="290" cy="698" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
				<circle cx="250" cy="698" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor1()} />
				<circle cx="290" cy="640" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
				<circle cx="333" cy="580" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor1()} />
				<circle cx="340" cy="610" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
				<circle cx="358" cy="650" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor1()} />
				<circle cx="378" cy="620" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
				<circle cx="396" cy="586" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor1()} />
				<circle cx="446" cy="586" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
				<circle cx="475" cy="535" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor1()} />
				<circle cx="498" cy="490" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
				<circle cx="520" cy="450" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor1()} />
				<circle cx="553" cy="450" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
				<circle cx="680" cy="450" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor1()} />
				<circle cx="690" cy="438" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
				<circle cx="715" cy="450" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
				<circle cx="750" cy="450" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor1()} />
				<circle cx="787" cy="438" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
				<circle cx="270" cy="612" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor1()} />
				<circle cx="200" cy="612" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
				<circle cx="150" cy="612" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor1()} />
				<circle cx="169" cy="593" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
				<circle cx="185" cy="575" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor1()} />
				<circle cx="160" cy="575" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
				<circle cx="130" cy="575" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor1()} />
				<circle cx="178" cy="525" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
				<circle cx="210" cy="490" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor1()} />
				<circle cx="230" cy="573" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
				<circle cx="280" cy="573" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor1()} />
				<circle cx="350" cy="573" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
				<circle cx="379" cy="530" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor1()} />
				<circle cx="405" cy="490" r='5' stroke="black" stroke-width="1" fill={getYELLOWColor2()} />
			</g>
		)
	}
	const DrawGREENLine = () => {
		return (
			<g transform="translate(0.0,0.0) scale(1.0,1.0)" fill={color} >
				<circle cx="707" cy="430" r='5' stroke="black" stroke-width="1" fill={getGREENColor1()} />
				<circle cx="705" cy="408" r='5' stroke="black" stroke-width="1" fill={getGREENColor2()} />
				<circle cx="736" cy="390" r='5' stroke="black" stroke-width="1" fill={getGREENColor1()} />
				<circle cx="808" cy="430" r='5' stroke="black" stroke-width="1" fill={getGREENColor1()} />
				<circle cx="806" cy="408" r='5' stroke="black" stroke-width="1" fill={getGREENColor2()} />
				<circle cx="775" cy="390" r='5' stroke="black" stroke-width="1" fill={getGREENColor1()} />
				<circle cx="755" cy="390" r='5' stroke="black" stroke-width="1" fill={getGREENColor2()} />
				<circle cx="750" cy="420" r='5' stroke="black" stroke-width="1" fill={getGREENColor1()} />
				<circle cx="754" cy="460" r='5' stroke="black" stroke-width="1" fill={getGREENColor2()} />
				<circle cx="756" cy="500" r='5' stroke="black" stroke-width="1" fill={getGREENColor1()} />
				<circle cx="720" cy="500" r='5' stroke="black" stroke-width="1" fill={getGREENColor2()} />
				<circle cx="620" cy="500" r='5' stroke="black" stroke-width="1" fill={getGREENColor1()} />
				<circle cx="720" cy="515" r='5' stroke="black" stroke-width="1" fill={getGREENColor1()} />
				<circle cx="713" cy="560" r='5' stroke="black" stroke-width="1" fill={getGREENColor2()} />
				<circle cx="697" cy="640" r='5' stroke="black" stroke-width="1" fill={getGREENColor1()} />
				<circle cx="689" cy="685" r='5' stroke="black" stroke-width="1" fill={getGREENColor2()} />
				<circle cx="677" cy="740" r='5' stroke="black" stroke-width="1" fill={getGREENColor1()} />
				<circle cx="513" cy="500" r='5' stroke="black" stroke-width="1" fill={getGREENColor2()} />
				<circle cx="511" cy="520" r='5' stroke="black" stroke-width="1" fill={getGREENColor1()} />
				<circle cx="492" cy="560" r='5' stroke="black" stroke-width="1" fill={getGREENColor2()} />
				<circle cx="452" cy="640" r='5' stroke="black" stroke-width="1" fill={getGREENColor1()} />
				<circle cx="431" cy="685" r='5' stroke="black" stroke-width="1" fill={getGREENColor2()} />
				<circle cx="400" cy="740" r='5' stroke="black" stroke-width="1" fill={getGREENColor1()} />
				<circle cx="432" cy="503" r='5' stroke="black" stroke-width="1" fill={getGREENColor1()} />
				<circle cx="438" cy="529" r='5' stroke="black" stroke-width="1" fill={getGREENColor2()} />
				<circle cx="465" cy="480" r='5' stroke="black" stroke-width="1" fill={getGREENColor1()} />
				<circle cx="488" cy="440" r='5' stroke="black" stroke-width="1" fill={getGREENColor2()} />
				<circle cx="320" cy="504" r='5' stroke="black" stroke-width="1" fill={getGREENColor2()} />
				<circle cx="224" cy="505" r='5' stroke="black" stroke-width="1" fill={getGREENColor1()} />
				<circle cx="230" cy="529" r='5' stroke="black" stroke-width="1" fill={getGREENColor2()} />
				<circle cx="272" cy="480" r='5' stroke="black" stroke-width="1" fill={getGREENColor1()} />
				<circle cx="305" cy="440" r='5' stroke="black" stroke-width="1" fill={getGREENColor2()} />
			</g>
		)
	}
	// ---------------
	const getREDColor1 = () => { return colorRed1; }
	const getREDColor2 = () => { return colorRed2; }
	const getBLUEColor1 = () => { return colorBlue1; }
	const getBLUEColor2 = () => { return colorBlue2; }
	const getYELLOWColor1 = () => { return colorYellow1; }
	const getYELLOWColor2 = () => { return colorYellow2; }
	const getGREENColor1 = () => { return colorGreen1; }
	const getGREENColor2 = () => { return colorGreen2; }
	// ------------------
	// 3D SCHEMATIC MODEL
	// ------------------
	const DRAWSCHEMATIC = () => {
		return (
			<g transform="translate(5,5) scale(0.9,0.9)" fill={color} >
				
				<g transform="translate(0,25)" >
				<SVGPLOT3 />
				</g>
				{/* CHILLED WATER RETURN (RED LINE) */}
				{ DrawREDLine() }

				{/* CHILLED WATER SUPPLIES (BLUE LINE) */}

				{/* COOLED WATER SUPPLIES (YELLOW LINE) */}

				{/* COOLED WATER RETURN (GREEN LINE) */}

				{/* HVAC WATER TEMPERATURE READINGS */}
				{ GETTEMPREADINGS() }

				{/* AIR COMPRESSOR PRESSURE*/}
				{ GETAIRCOMP() }

			</g>
		)
	}
	// ----------
	// FLOOR PLAN
	// ----------
	const DRAWFPLAN = () => {
		// -----------
		return (
			<g transform="translate(10,0) scale(0.80,0.80)" fill={color} >
				<SVGFPLAN />
				<g transform="translate(1700,100)" >
					<text x="0" y="0" font-size='1.5rem'  fill="black">#01 RMS</text>
					<text x="0" y="30" font-size='1.5rem' fill="black">#02 VKL</text>
					<text x="0" y="60" font-size='1.5rem' fill="black">#03 IQA STOREL</text>
					<text x="0" y="90" font-size='1.5rem' fill="black">#04 GFC STORE</text>
					<text x="0" y="120" font-size='1.5rem' fill="black">#05 ELECTRODE</text>
					<text x="0" y="150" font-size='1.5rem' fill="black">#06 MULTIMATICL</text>
					<text x="0" y="180" font-size='1.5rem' fill="black">#07 PRODUCTION 1 (BACKEND)</text>
					<text x="0" y="210" font-size='1.5rem' fill="black">#08 PRODUCTION 2 (BACKEND)</text>
					<text x="0" y="240" font-size='1.5rem' fill="black">#09 CHEMICAL STORE</text>
					<text x="0" y="270" font-size='1.5rem' fill="black">#10 SERVER ROOM</text>
					<text x="0" y="300" font-size='1.5rem' fill="black">#11 CLEAM ROOM 10K (MOV 5 OVEN)</text>
					<text x="0" y="330" font-size='1.5rem' fill="black">#12 CLEAN ROOM 10 (MOUNTING)</text>
					<text x="0" y="360" font-size='1.5rem' fill="black">#13 CLEAN ROOM 100 (PASTING)</text>
					<text x="0" y="390" font-size='1.5rem' fill="black">#14 PASTE PREPARATION ROOM</text>
					<text x="0" y="420" font-size='1.5rem' fill="black">#15 PRODUCTION (FRONTEND)</text>
					<text x="0" y="450" font-size='1.5rem' fill="black">#16 DLA PASTING ROOM 1</text>
					<text x="0" y="480" font-size='1.5rem' fill="black">#17 DLA PASTING ROOM 2</text>
					<text x="0" y="510" font-size='1.5rem' fill="black">#18 DLA MOUNTING ROOM 1</text>
					<text x="0" y="540" font-size='1.5rem' fill="black">#19 DLA MOUNTING ROOM 2</text>
					<text x="0" y="570" font-size='1.5rem' fill="black">#20 HVC PRODUCTION</text>
					<text x="0" y="600" font-size='1.5rem' fill="black">#21 CCU CALIBRATTION</text>
					<text x="0" y="630" font-size='1.5rem' fill="black">#22 HVC HIGH TESTER ROOM </text>
					<text x="0" y="660" font-size='1.5rem' fill="black">#23 MAIN SWITCH BOARD (MSB) ROOM</text>
					<text x="0" y="690" font-size='1.5rem' fill="black">#24 TRANSFORMER ROOM</text>
				</g>

				<g transform="translate(610,550)" >
					<circle cx="0" cy="0" r="40" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="20" fill="blue" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="10" fill="white" filter="url(#heatMap)" />
					<text x="-5" y="-5" font-size='1.0rem' fill="black">#01</text>
				</g>
				<g transform="translate(810,550)" >
					<circle cx="0" cy="0" r="40" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="20" fill="green" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="10" fill="white" filter="url(#heatMap)" />
					<text x="-5" y="-5" font-size='1.0rem' fill="black">#02</text>
				</g>
				<g transform="translate(310,450)" >
					<circle cx="0" cy="0" r="40" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="20" fill="yellow" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="10" fill="white" filter="url(#heatMap)" />
					<text x="-5" y="-5" font-size='1.0rem' fill="black">#03</text>
				</g>
				<g transform="translate(360,250)" >
					<circle cx="0" cy="0" r="50" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="35" fill="orange" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="5" fill="white" filter="url(#heatMap)" />
					<text x="-5" y="-5" font-size='1.0rem' fill="black">#04</text>
				</g>
				<g transform="translate(1000,410)" >
					<circle cx="0" cy="0" r="50" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="35" fill="red" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="5" fill="white" filter="url(#heatMap)" />
					<text x="-5" y="-5" font-size='1.0rem' fill="black">#05</text>
				</g>
				<g transform="translate(1130,320)" >
					<circle cx="0" cy="0" r="50" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="35" fill="blue" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="5" fill="red" filter="url(#heatMap)" />
					<text x="-5" y="0" font-size='1.0rem' fill="white">#06</text>
				</g>
				<g transform="translate(940,280)" >
					<circle cx="0" cy="0" r="50" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="35" fill="blue" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="5" fill="red" filter="url(#heatMap)" />
					<text x="-5" y="0" font-size='1.0rem' fill="white">#07</text>
				</g>
				<g transform="translate(960,200)" >
					<circle cx="0" cy="0" r="50" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="35" fill="blue" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="5" fill="red" filter="url(#heatMap)" />
					<text x="-5" y="0" font-size='1.0rem' fill="white">#08</text>
				</g>
				<g transform="translate(460,280)" >
					<circle cx="0" cy="0" r="30" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="25" fill="blue" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="5" fill="red" filter="url(#heatMap)" />
					<text x="-5" y="0" font-size='1.0rem' fill="white">#09</text>
				</g>
				<g transform="translate(480,600)" >
					<circle cx="0" cy="0" r="50" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="35" fill="yellow" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="5" fill="red" filter="url(#heatMap)" />
					<text x="-5" y="0" font-size='1.0rem' fill="red">#10</text>
				</g>
				<g transform="translate(650,210)" >
					<circle cx="0" cy="0" r="50" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="35" fill="yellow" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="5" fill="red" filter="url(#heatMap)" />
					<text x="-5" y="0" font-size='1.0rem' fill="red">#11</text>
				</g>
				<g transform="translate(600,250)" >
					<circle cx="0" cy="0" r="50" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="35" fill="yellow" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="5" fill="red" filter="url(#heatMap)" />
					<text x="-5" y="0" font-size='1.0rem' fill="black">#12</text>
				</g>
				<g transform="translate(600,180)" >
					<circle cx="0" cy="0" r="50" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="35" fill="yellow" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="5" fill="red" filter="url(#heatMap)" />
					<text x="-5" y="0" font-size='1.0rem' fill="black">#13</text>
				</g>
				<g transform="translate(510,280)" >
					<circle cx="0" cy="0" r="30" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="25" fill="yellow" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="5" fill="red" filter="url(#heatMap)" />
					<text x="-5" y="0" font-size='1.0rem' fill="black">#14</text>
				</g>
				<g transform="translate(640,360)" >
					<circle cx="0" cy="0" r="50" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="35" fill="yellow" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="5" fill="red" filter="url(#heatMap)" />
					<text x="-5" y="0" font-size='1.0rem' fill="black">#15</text>
				</g>
				<g transform="translate(710,410)" >
					<circle cx="0" cy="0" r="50" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="35" fill="yellow" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="5" fill="red" filter="url(#heatMap)" />
					<text x="-5" y="0" font-size='1.0rem' fill="black">#16</text>
				</g>
				<g transform="translate(650,410)" >
					<circle cx="0" cy="0" r="50" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="35" fill="yellow" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="5" fill="red" filter="url(#heatMap)" />
					<text x="-5" y="0" font-size='1.0rem' fill="black">#17</text>
				</g>
				<g transform="translate(720,290)" >
					<circle cx="0" cy="0" r="50" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="35" fill="yellow" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="5" fill="red" filter="url(#heatMap)" />
					<text x="-5" y="0" font-size='1.0rem' fill="black">#18</text>
				</g>
				<g transform="translate(670,300)" >
					<circle cx="0" cy="0" r="50" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="35" fill="yellow" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="5" fill="red" filter="url(#heatMap)" />
					<text x="-5" y="0" font-size='1.0rem' fill="black">#19</text>
				</g>
				<g transform="translate(510,400)" >
					<circle cx="0" cy="0" r="50" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="35" fill="yellow" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="5" fill="red" filter="url(#heatMap)" />
					<text x="-5" y="0" font-size='1.0rem' fill="black">#20</text>
				</g>
				<g transform="translate(510,200)" >
					<circle cx="0" cy="0" r="50" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="35" fill="yellow" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="5" fill="red" filter="url(#heatMap)" />
					<text x="-5" y="0" font-size='1.0rem' fill="black">#21</text>
				</g>
				<g transform="translate(760,140)" >
					<circle cx="0" cy="0" r="50" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="25" fill="red" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="5" fill="blue" filter="url(#heatMap)" />
					<text x="-10" y="0" font-size='1.0rem' fill="white">#22</text>
				</g>
				<g transform="translate(700,80)" >
					<circle cx="0" cy="0" r="50" fill="cyan" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="25" fill="red" filter="url(#heatMap)" />
					<circle cx="0" cy="0" r="5" fill="blue" filter="url(#heatMap)" />
					<text x="-10" y="0" font-size='1.0rem' fill="white">#23</text>
				</g>
				<g transform="translate(630,80)" >
						<circle cx="0" cy="0" r="50" fill="cyan" filter="url(#heatMap)" />
						<circle cx="0" cy="0" r="25" fill="red" filter="url(#heatMap)" />
						<circle cx="0" cy="0" r="5" fill="blue" filter="url(#heatMap)" />
						<text x="-10" y="0" font-size='1.0rem' fill="white">#24</text>
				</g>

			</g>
		)
	}
	const GETAIRCOMP = () => {
		return (
			<g>
				<g transform="translate(320.0,190.0)">
					<rect x="0" y="0" width="90" height="20" fill='white	' />
					<text x="5" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[AIR_COMPRESSOR1].reading} bar</text>
				</g>
				<g transform="translate(450.0,190.0)">
					<rect x="0" y="0" width="90" height="20" fill='white	' />
					<text x="5" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[AIR_COMPRESSOR2].reading} bar</text>
				</g>
				<g transform="translate(580.0,190.0)">
					<rect x="0" y="0" width="90" height="20" fill='white	' />
					<text x="5" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[AIR_COMPRESSOR3].reading} bar</text>
				</g>
			</g>
		)
	}
	const GETTEMPREADINGS = () => {
		return (
			<g>
				<g transform="translate(710.0,790.0)">
						<rect x="0" y="0" width="100" height="20" fill='blue' />
						<text x="5" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CH_TEMP1' id='CHILLER_A_CH_TEMP1'>#44={sensorsData && sensorsData[CHILLER_A_CH_TEMP1].reading} C</text>
				</g>
				<g transform="translate(450.0,790.0)">
						<rect x="0" y="0" width="100" height="20" fill='blue' />
						<text x="5" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CH_TEMP1' id='CHILLER_A_CH_TEMP1'>#46={sensorsData && sensorsData[CHILLER_B_CH_TEMP1].reading} C</text>
				</g>
				<g transform="translate(950.0,510.0)">
						<rect x="0" y="0" width="100" height="20" fill='blue' />
						<text x="5" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CH_TEMP1' id='CHILLER_A_CH_TEMP1'>#52={sensorsData && sensorsData[AHU_A_TEMP1].reading} C</text>
				</g>
				<g transform="translate(950.0,630.0)">
						<rect x="0" y="0" width="100" height="20" fill='blue' />
						<text x="5" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CH_TEMP1' id='CHILLER_A_CH_TEMP1'>#14={sensorsData && sensorsData[AHU_A_TEMP2].reading} C</text>
				</g>
				<g transform="translate(1080.0,405.0)">
						<rect x="0" y="0" width="100" height="20" fill='blue' />
						<text x="5" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CH_TEMP1' id='CHILLER_A_CH_TEMP1'>#50={sensorsData && sensorsData[AHU_B_TEMP1].reading} C</text>
				</g>
				<g transform="translate(1080.0,365.0)">
						<rect x="0" y="0" width="100" height="20" fill='red' />
						<text x="5" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CH_TEMP1' id='CHILLER_A_CH_TEMP1'>#48={sensorsData && sensorsData[AHU_B_TEMP2].reading} C</text>
				</g>
				<g transform="translate(460.0,760.0)">
						<rect x="0" y="0" width="90" height="20" fill='red' />
						<text x="5" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CH_TEMP1' id='CHILLER_A_CH_TEMP1'>#42={sensorsData && sensorsData[CHILLER_B_CH_TEMP2].reading} C</text>
				</g>
				<g transform="translate(720.0,760.0)">
						<rect x="0" y="0" width="100" height="20" fill='red' />
						<text x="5" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CH_TEMP1' id='CHILLER_A_CH_TEMP1'>#16={sensorsData && sensorsData[CHILLER_A_CH_TEMP2].reading} C</text>
				</g>
				<g transform="translate(280.0,740.0)">
						<rect x="0" y="0" width="100" height="20" fill='yellow' />
						<text x="5" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CH_TEMP1' id='CHILLER_A_CH_TEMP1'>#08={sensorsData && sensorsData[CHILLER_B_CW_TEMP2].reading} C</text>
				</g>
				<g transform="translate(280.0,770.0)">
						<rect x="0" y="0" width="100" height="20" fill='green' />
						<text x="5" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CH_TEMP1' id='CHILLER_A_CH_TEMP1'>#40={sensorsData && sensorsData[CHILLER_B_CW_TEMP1].reading} C</text>
				</g>
				<g transform="translate(570.0,740.0)">
						<rect x="0" y="0" width="100" height="20" fill='yellow' />
						<text x="5" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CH_TEMP1' id='CHILLER_A_CH_TEMP1'>#12={sensorsData && sensorsData[CHILLER_A_CW_TEMP1].reading} C</text>
				</g>
				<g transform="translate(570.0,770.0)">
						<rect x="0" y="0" width="100" height="20" fill='green' />
						<text x="5" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CH_TEMP1' id='CHILLER_A_CH_TEMP1'>#18={sensorsData && sensorsData[CHILLER_A_CW_TEMP2].reading} C</text>
				</g>
				<g transform="translate(200.0,380.0)">
						<rect x="0" y="0" width="100" height="20" fill='yellow' />
						<text x="5" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CH_TEMP1' id='CHILLER_A_CH_TEMP1'>#36={sensorsData && sensorsData[CTW_A_TEMP2].reading} C</text>
				</g>
				<g transform="translate(80.0,500.0)">
						<rect x="0" y="0" width="100" height="20" fill='green' />
						<text x="5" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CH_TEMP1' id='CHILLER_A_CH_TEMP1'>#04={sensorsData && sensorsData[CTW_A_TEMP1].reading} C</text>
				</g>
				<g transform="translate(380.0,380.0)">
						<rect x="0" y="0" width="100" height="20" fill='yellow' />
						<text x="5" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CH_TEMP1' id='CHILLER_A_CH_TEMP1'>#10={sensorsData && sensorsData[CTW_B_TEMP2].reading} C</text>
				</g>
				<g transform="translate(245.0,500.0)">
						<rect x="0" y="0" width="100" height="20" fill='green' />
						<text x="5" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CH_TEMP1' id='CHILLER_A_CH_TEMP1'>#38={sensorsData && sensorsData[CTW_B_TEMP1].reading} C</text>
				</g>
				<g transform="translate(560.0,420.0)">
						<rect x="0" y="0" width="100" height="20" fill='yellow' />
						<text x="5" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CH_TEMP1' id='CHILLER_A_CH_TEMP1'>#32={sensorsData && sensorsData[WCPU_A_TEMP1].reading} C</text>
				</g>
				<g transform="translate(560.0,350.0)">
						<rect x="0" y="0" width="100" height="20" fill='green' />
						<text x="5" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CH_TEMP1' id='CHILLER_A_CH_TEMP1'>#34={sensorsData && sensorsData[WCPU_A_TEMP2].reading} C</text>
				</g>
				<g transform="translate(700.0,420.0)">
						<rect x="0" y="0" width="100" height="20" fill='yellow' />
						<text x="5" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CH_TEMP1' id='CHILLER_A_CH_TEMP1'>#22={sensorsData && sensorsData[WCPU_B_TEMP1].reading} C</text>
				</g>
				<g transform="translate(700.0,350.0)">
					<rect x="0" y="0" width="100" height="20" fill='green' />
					<text x="5" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CH_TEMP1' id='CHILLER_A_CH_TEMP1'>#30={sensorsData && sensorsData[WCPU_B_TEMP2].reading} C</text>
				</g>							
			</g>
		)
	}
	// -------------------------
	const GETTABLEDATA = () => {
		return (
			<g transform="translate(2,-15) scale(1.0,1.0)" fill={color} >
				{/* POWER METER */}
				<g transform="translate(20.0,0.0)">
					<g transform="translate(0.0,0.0)">
						<g transform="translate(0.0,0.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_01].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_01].reading} kWh</text>
						</g>
						<g transform="translate(0.0,25.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_02].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_02].reading} kWh</text>
						</g>
						<g transform="translate(0.0,50.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_03].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_03].reading} kWh</text>
						</g>
						<g transform="translate(0.0,75.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_04].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_04].reading} kWh</text>
						</g>
						<g transform="translate(0.0,100.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_05].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_05].reading} kWh</text>
						</g>
					</g>
					<g transform="translate(300.0,0.0)">
						<g transform="translate(0.0,0.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_06].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_06].reading} kWh</text>
						</g>
						<g transform="translate(0.0,25.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_07].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_07].reading} kWh</text>
						</g>
						<g transform="translate(0.0,50.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_08].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_08].reading} kWh</text>
						</g>
						<g transform="translate(0.0,75.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_09].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_09].reading} kWh</text>
						</g>
						<g transform="translate(0.0,100.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_10].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_10].reading} kWh</text>
						</g>
					</g>
					<g transform="translate(600.0,0.0)">
						<g transform="translate(0.0,0.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_11].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_11].reading} kWh</text>
						</g>
						<g transform="translate(0.0,25.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_12].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_12].reading} kWh</text>
						</g>
						<g transform="translate(0.0,50.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_13].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_13].reading} kWh</text>
						</g>
						<g transform="translate(0.0,75.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_14].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_14].reading} kWh</text>
						</g>
						<g transform="translate(0.0,100.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_15].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_15].reading} kWh</text>
						</g>
					</g>
					<g transform="translate(900.0,0.0)">
						<g transform="translate(0.0,0.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_16].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_16].reading} kWh</text>
						</g>
						<g transform="translate(0.0,25.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_17].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_17].reading} kWh</text>
						</g>
						<g transform="translate(0.0,50.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_18].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_18].reading} kWh</text>
						</g>
						<g transform="translate(0.0,75.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_19].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_19].reading} kWh</text>
						</g>
						<g transform="translate(0.0,100.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_20].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_20].reading} kWh</text>
						</g>
					</g>
					<g transform="translate(1200.0,0.0)">
						<g transform="translate(0.0,0.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_21].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_21].reading} kWh</text>
						</g>
						<g transform="translate(0.0,25.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_22].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_22].reading} kWh</text>
						</g>
						<g transform="translate(0.0,50.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_23].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_23].reading} kWh</text>
						</g>
						<g transform="translate(0.0,75.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_24].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_24].reading} kWh</text>
						</g>
						<g transform="translate(0.0,100.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_25].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_25].reading} kWh</text>
						</g>
					</g>
					<g transform="translate(1500.0,0.0)">
						<g transform="translate(0.0,0.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_26].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_26].reading} kWh</text>
						</g>
						<g transform="translate(0.0,25.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_27].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_27].reading} kWh</text>
						</g>
						<g transform="translate(0.0,50.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_28].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_28].reading} kWh</text>
						</g>
						<g transform="translate(0.0,75.0)">
							<rect x="0" y="0" width="180" height="20" fill='black' />
							<text x="15" y="15" fill="white" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[PWRMTR_29].name}</text>
							<rect x="180" y="0" width="120" height="20" fill='blue	' />
							<text x="190" y="15" fill="white" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[PWRMTR_29].reading} kWh</text>
						</g>
					</g>
				</g>
				{/* AIR FLOW RH */}
				<g transform="translate(1500.0,150.0)">
					<g transform="translate(0.0,0.0)">
						<rect x="0" y="0" width="200" height="20" fill='lightskyblue' />
						<text x="15" y="15" fill="darkblue" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[AIRFLOW_RH1].name}</text>
						<rect x="200" y="0" width="120" height="20" fill='greenyellow	' />
						<text x="215" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[AIRFLOW_RH1].reading}</text>
					</g>
					<g transform="translate(0.0,25.0)">
						<rect x="0" y="0" width="200" height="20" fill='lightskyblue' />
						<text x="15" y="15" fill="darkblue" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[AIRFLOW_RH2].name}</text>
						<rect x="200" y="0" width="120" height="20" fill='greenyellow	' />
						<text x="215" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[AIRFLOW_RH2].reading}</text>
					</g>
					<g transform="translate(0.0,50.0)">
						<rect x="0" y="0" width="200" height="20" fill='lightskyblue' />
						<text x="15" y="15" fill="darkblue" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[AIRFLOW_RH3].name}</text>
						<rect x="200" y="0" width="120" height="20" fill='greenyellow	' />
						<text x="215" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[AIRFLOW_RH3].reading}</text>
					</g>
				</g>
				{/* AIR FLOW VELOCITY */}
				<g transform="translate(1500.0,250.0)">
					<g transform="translate(0.0,0.0)">
						<rect x="0" y="0" width="200" height="20" fill='lightskyblue' />
						<text x="15" y="15" fill="darkblue" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[AIRFLW_VEL1].name}</text>
						<rect x="200" y="0" width="100" height="20" fill='greenyellow	' />
						<text x="215" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[AIRFLW_VEL1].reading}</text>
					</g>
					<g transform="translate(0.0,25.0)">
						<rect x="0" y="0" width="200" height="20" fill='lightskyblue' />
						<text x="15" y="15" fill="darkblue" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[AIRFLW_VEL2].name}</text>
						<rect x="200" y="0" width="100" height="20" fill='greenyellow	' />
						<text x="215" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[AIRFLW_VEL2].reading}</text>
					</g>
					<g transform="translate(0.0,50.0)">
						<rect x="0" y="0" width="200" height="20" fill='lightskyblue' />
						<text x="15" y="15" fill="darkblue" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[AIRFLW_VEL3].name}</text>
						<rect x="200" y="0" width="100" height="20" fill='greenyellow	' />
						<text x="215" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[AIRFLW_VEL3].reading}</text>
					</g>
					<g transform="translate(0.0,75.0)">
						<rect x="0" y="0" width="200" height="20" fill='lightskyblue' />
						<text x="15" y="15" fill="darkblue" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[AIRFLW_VEL4].name}</text>
						<rect x="200" y="0" width="100" height="20" fill='greenyellow	' />
						<text x="215" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[AIRFLW_VEL4].reading}</text>
					</g>
					<g transform="translate(0.0,100.0)">
						<rect x="0" y="0" width="200" height="20" fill='lightskyblue' />
						<text x="15" y="15" fill="darkblue" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[AIRFLW_VEL5].name}</text>
						<rect x="200" y="0" width="100" height="20" fill='greenyellow	' />
						<text x="215" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[AIRFLW_VEL5].reading}</text>
					</g>
					<g transform="translate(0.0,125.0)">
						<rect x="0" y="0" width="200" height="20" fill='lightskyblue' />
						<text x="15" y="15" fill="darkblue" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[AIRFLW_VEL6].name}</text>
						<rect x="200" y="0" width="100" height="20" fill='greenyellow	' />
						<text x="215" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[AIRFLW_VEL6].reading}</text>
					</g>
					<g transform="translate(0.0,150.0)">
						<rect x="0" y="0" width="200" height="20" fill='lightskyblue' />
						<text x="15" y="15" fill="darkblue" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[AIRFLW_VEL7].name}</text>
						<rect x="200" y="0" width="100" height="20" fill='greenyellow	' />
						<text x="215" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[AIRFLW_VEL7].reading}</text>
					</g>
					<g transform="translate(0.0,175.0)">
						<rect x="0" y="0" width="200" height="20" fill='lightskyblue' />
						<text x="15" y="15" fill="darkblue" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[AIRFLW_VEL8].name}</text>
						<rect x="200" y="0" width="100" height="20" fill='greenyellow	' />
						<text x="215" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[AIRFLW_VEL8].reading}</text>
					</g>
					<g transform="translate(0.0,200.0)">
						<rect x="0" y="0" width="200" height="20" fill='lightskyblue' />
						<text x="15" y="15" fill="darkblue" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[AIRFLW_VEL9].name}</text>
						<rect x="200" y="0" width="100" height="20" fill='greenyellow	' />
						<text x="215" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[AIRFLW_VEL9].reading}</text>
					</g>
					<g transform="translate(0.0,225.0)">
						<rect x="0" y="0" width="200" height="20" fill='lightskyblue' />
						<text x="15" y="15" fill="darkblue" font-size="1.0em" name='AHU' id='AHU' >{sensorsData && sensorsData[AIRFLW_VEL10].name}</text>
						<rect x="200" y="0" width="100" height="20" fill='greenyellow	' />
						<text x="215" y="15" fill="black" font-size="1.0em" name='CHILLER_A_CHS_PRESS1' id='CHILLER_A_CHS_PRESS1'>{sensorsData && sensorsData[AIRFLW_VEL10].reading}</text>
					</g>
				</g>
			</g>
		)		
	}
	// ---------------------
	return (
		// <MDBRow center>
			<MDBCol md="12">
			<MDBCard className="p-0" style={{width:"auto"}} >

				<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="1800" height="780" 
						 viewBox="0 0 1800 780"  preserveAspectRatio="xMidYMid meet" >
					<g transform="translate(2,60) scale(0.90,0.90)" fill={color} >

						<def>
							<radialGradient id="grad1" cx="50%" cy="50%" r="25%" fx="25%" fy="25%">
									<stop offset="0%" style={{stopColor:'rgb(255,255,255)',stopOpacity:0}} />
									<stop offset="100%" style={{stopColor:'rgb(0,0,255)',stopOpacity:1}} />
							</radialGradient>
							<filter id="heatMap">
									{/* <!--Blur effect--> */}
									<feGaussianBlur in="SourceGraphic" stdDeviation="18"/>
							</filter>
						</def>

						{ counter > 15 ? DRAWFPLAN() : DRAWSCHEMATIC() }
						{ counter < 15 && GETTABLEDATA() }

					</g>
				</svg>
				</MDBCard>
			</MDBCol>
		// </MDBRow>
	)
}

// Set default props
TDK_IsoVIEW.defaultProps = {
  color: "black",
  handleComponetSelection: null
};
export default TDK_IsoVIEW