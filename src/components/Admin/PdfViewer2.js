import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { usePdf } from 'react-pdf-js';

const PdfViewer2 = () => {
	const { selectedInvoiceId } = useParams();
	const API = process.env.REACT_APP_API;
	const pdfUrl = `${API}download2/${selectedInvoiceId}`;
	// console.log('pdfUrl', pdfUrl);

	//const handlePrint = () => {
	//		window.print();
	//	};

	// const handleDownload = () => {
	// 	window.location = ${API}download/${selectedInvoiceId};
	// };

	return (
		<div style={{ position: 'relative', width: '100%', height: '100vh' }}>
			<iframe
				id='pdfViewerIframe'
				title='PDF Viewer'
				src={`https://docs.google.com/viewer?url=${encodeURIComponent(
					pdfUrl
				)}&embedded=true`}
				style={{ width: '100%', height: '100%', border: 'none' }}
			/>
			{/*
			<div
				style={{
					position: 'absolute',
					bottom: '10px',
					right: '25px',
					zIndex: 999,
				}}
			>
				<img
					src={printIcon}
					alt='Print'
					style={{
						width: '70px',
						height: '70px',
						cursor: 'pointer',
					}}
					onClick={handlePrint}
				/>
				<img
					src={Download}
					alt='Download'
					style={{
						width: '60px',
						height: '60px',
						cursor: 'pointer',
					}}
					onClick={handleDownload}
				/> 
			</div>
*/}
		</div>
	);
	// const { selectedInvoiceId, timestamp } = useParams();
	// const API = process.env.REACT_APP_API;
	// const pdfUrl = `${API}download2/${selectedInvoiceId}`;
	// const [isUrlValid, setIsUrlValid] = useState(true);
	// const [showPrintSaveOptions, setShowPrintSaveOptions] = useState(true);

	// const [page, setPage] = useState(1);
	// const [pages, setPages] = useState(null);
	// const canvasEl = useRef(null);

	// useEffect(() => {
	// 	const checkUrlValidity = () => {
	// 		const currentTimestamp = Date.now();
	// 		const urlExpirationTime = parseInt(timestamp, 10);

	// 		// Check if the URL is still valid
	// 		if (currentTimestamp > urlExpirationTime) {
	// 			setIsUrlValid(false);
	// 		}
	// 	};

	// 	checkUrlValidity();
	// }, [timestamp]);

	// const [loading, numPages] = usePdf({
	// 	file: pdfUrl,
	// 	onDocumentComplete: ({ numPages }) => setPages(numPages),
	// 	page,
	// 	canvasEl,
	// });

	// useEffect(() => {
	// 	const checkUrlValidity = async () => {
	// 		try {
	// 			const response = await fetch(pdfUrl);
	// 			if (!response.ok) {
	// 				setIsUrlValid(false);
	// 			}
	// 		} catch (error) {
	// 			setIsUrlValid(false);
	// 		}
	// 	};

	// 	checkUrlValidity();
	// }, [pdfUrl]);

	// if (!isUrlValid) {
	// 	return (
	// 		<div
	// 			style={{
	// 				display: 'flex',
	// 				justifyContent: 'center',
	// 				alignItems: 'center',
	// 				height: '100vh',
	// 				flexDirection: 'column',
	// 			}}
	// 		>
	// 			Sorry, the PDF link has expired or is invalid.
	// 		</div>
	// 	);
	// }

	// const handlePrint = () => {
	// 	window.print();
	// 	setShowPrintSaveOptions(false);
	// };

	// const handleSave = () => {
	// 	setShowPrintSaveOptions(false);
	// };

	// const renderPagination = (page, pages) => {
	// 	// Your pagination logic here
	// };

	// return (
	// 	<div
	// 		style={{
	// 			display: 'flex',
	// 			justifyContent: 'center',
	// 			alignItems: 'center',
	// 			height: '100vh',
	// 			flexDirection: 'column',
	// 			marginTop: '150px',
	// 		}}
	// 	>
	// 		{showPrintSaveOptions && (
	// 			<div style={{ marginBottom: '20px' }}>
	// 				<button style={{ marginRight: '10px' }} onClick={handlePrint}>
	// 					Print
	// 				</button>
	// 				<button onClick={handleSave}>Save</button>
	// 			</div>
	// 		)}
	// 		{loading && <span>Loading...</span>}
	// 		<div style={{ display: 'inline-block' }}>
	// 			<canvas ref={canvasEl} />
	// 		</div>
	// 		{renderPagination(page, pages)}
	// 	</div>
	// );
};

export default PdfViewer2;
