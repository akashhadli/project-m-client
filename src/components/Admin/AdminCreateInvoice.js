import React,{useEffect,useState} from 'react'
import './AdminCreateInvoice.css';
import background from '../images/Desktop.png'
import A from '../images/A.png';
import D from '../images/D.png';
import AdminNavbar from './AdminNavbar';

function AdminCreateInvoice() {
  const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState({});

    const [sellers, setSellers] = useState([]);
    const [selectedSeller, setSelectedSeller] = useState({});

    const [buyers, setBuyers] = useState([]);
    const [selectedBuyer, setSelectedBuyer] = useState({});
  
    const [consignments, setConsignments] = useState([]);
    const [addedConsignment, setAddedConsignment] = useState({});
    const [selectedConsignment, setSelectedConsignment] = useState({});

    const [dataToSend, setDataToSend] = useState({
        companydetails: {
          companyname: '',
          companyregistrationtype: '',
          companygstno: '',
          companycontact: '',
          companystate: '',
          companyofficeaddress: '',
          companypincode: '',
        },
        sellerdetails: {
          sellercompanyname: '',
          sellercompanyaddress: '',
          sellercompanystatename: '',
          sellercompanystatecode: '',
        },
        buyerdetails: {
          buyercompanyname: '',
          buyercompanyaddress: '',
          buyercompanystatename: '',
          buyercompanystatecode: '',
        },
        vehicledetails: {
            
            drivernumber: '',
            vechiclenuumber: '',
            vechiclemodel: '',
        },
        consignmentdetails: {
            itemdetails: [
            ],
          },
          invoicedetails: {
            invoiceno: '',
            invoicedate: '',
           
        },
        boardingdetails: {
            dateofloading: '',
            startingpoint: '',
            endingpoint: '',
            watermark: '',

        },

      });

    const API = process.env.REACT_APP_API;

    useEffect(() => {
        const fetchCompanies = async () => {
          try {
            const response = await fetch(`${API}company`);
            if (response.ok) {
              const data = await response.json();
              setCompanies(data);
            } else {
              console.error('Failed to fetch companies data');
            }
          } catch (error) {
            console.error('Error fetching companies data:', error);
          }
        };
      
        fetchCompanies();
      }, [API]);

        useEffect(() => {
            const fetchSellers = async () => {
            try {
                const response = await fetch(`${API}seller`);
                if (response.ok) {
                const data = await response.json();
                setSellers(data);
                }
                else{
                console.error('Failed to fetch sellers data');
                }
            }
            catch (error) {
                console.error('Error fetching sellers data:', error);
            }
        };
        fetchSellers();
        }, [API]);

        useEffect(() => {
            const fetchBuyers = async () => {
            try {
                const response = await fetch(`${API}buyer`);
                if (response.ok) {
                const data = await response.json();
                setBuyers(data);
                }
                else{
                console.error('Failed to fetch buyers data');
                }
            }
            catch (error) {
                console.error('Error fetching buyers data:', error);
            }
        };
        fetchBuyers();
        }, [API]);

       

        useEffect(() => {
            const fetchConsignments = async () => {
            try {
                const response = await fetch(`${API}consignment`);
                if (response.ok) {
                const data = await response.json();
                setConsignments(data);
                }
                else{
                console.error('Failed to fetch consignments data');
                }
            }
            catch (error) {
                console.error('Error fetching consignments data:', error);
            }
        };
        fetchConsignments();
        }, [API]);

        const handleSelectChangeCompany = (e) => {
            const selectedCompanyId = e.target.value;
            const selectedCompany = companies.find((company) => company._id === selectedCompanyId);

            setDataToSend((prevData) => ({
                ...prevData,
                companydetails: {
                  ...prevData.companydetails,
                  companyid: selectedCompany.companyid,
                  companyname: selectedCompany.companyname,
                  companyregistrationtype: selectedCompany.companyregistrationtype,
                  companygstno: selectedCompany.companygstno,
                  companycontact: selectedCompany.companycontact,
                  companystate: selectedCompany.companystate,
                  companyofficeaddress: selectedCompany.companyofficeaddress,
                  companypincode: selectedCompany.companypincode,
                },
                }));
                setSelectedCompany(selectedCompany);
            };

            const handleSelectChangeSeller = (e) => {
                const selectedSellerId = e.target.value;
                const selectedSeller = sellers.find((seller) => seller._id === selectedSellerId);
        
                setDataToSend((prevData) => ({
                  ...prevData,
                  sellerdetails: {
                    ...prevData.sellerdetails,
                    sellerid: selectedSeller.sellerid,
                    sellercompanyname: selectedSeller.sellercompanyname,
                    sellercompanyaddress: selectedSeller.sellercompanyaddress,
                    sellercompanystatename: selectedSeller.sellercompanystatename,
                    sellercompanystatecode: selectedSeller.sellercompanystatecode,
                  },
                }));
                setSelectedSeller(selectedSeller);
              };

                const handleSelectChangeBuyer = (e) => {
                    const selectedBuyerId = e.target.value;
                    const selectedBuyer = buyers.find((buyer) => buyer._id === selectedBuyerId);
            
                    setDataToSend((prevData) => ({
                      ...prevData,
                      buyerdetails: {
                        ...prevData.buyerdetails,
                        buyerid: selectedBuyer.buyerid,
                        buyercompanyname: selectedBuyer.buyercompanyname,
                        buyercompanyaddress: selectedBuyer.buyercompanyaddress,
                        buyercompanystatename: selectedBuyer.buyercompanystatename,
                        buyercompanystatecode: selectedBuyer.buyercompanystatecode,
                      },
                    }));
                    setSelectedBuyer(selectedBuyer);
                  };
                      const handleSelectChangeConsignment = (e) => {
                        const selectedConsignmentId = e.target.value;
                        const selectedConsignment = consignments.find(
                          (consignment) => consignment._id === selectedConsignmentId
                        );
                    
                        setAddedConsignment(selectedConsignment);
                      };
                    
                      const ConsignmentsAdd = () => {
                        if (
                          !addedConsignment.itemname ||
                          !addedConsignment.itemquantity ||
                          !addedConsignment.itemhsn ||
                          !addedConsignment.itemprice ||
                          !addedConsignment.itemtaxrate
                        ) {
                          return;
                        }
                    
                        setDataToSend((prevData) => ({
                          ...prevData,
                          consignmentdetails: {
                            ...prevData.consignmentdetails,
                            itemdetails: [
                              ...prevData.consignmentdetails.itemdetails,
                              {
                                itemname: addedConsignment.itemname,
                                itemquantity: addedConsignment.itemquantity,
                                itemhsn: addedConsignment.itemhsn,
                                itemprice: addedConsignment.itemprice,
                                itemtaxrate: addedConsignment.itemtaxrate,
                              },
                            ],
                          },
                        }));
                        setAddedConsignment({});
                      };
                    
                      const ConsignmentsRemove = (index) => {
                        setDataToSend((prevData) => ({
                          ...prevData,
                          consignmentdetails: {
                            ...prevData.consignmentdetails,
                            itemdetails: prevData.consignmentdetails.itemdetails.filter((item, i) => i !== index),
                          },
                        }));
                      };
                    
                      const handleConsignmentChange = (e) => {
                        const value = e.target.value;
                        setAddedConsignment((prevAdded) => ({
                          ...prevAdded,
                          [e.target.name]: value,
                        }));
                      };
                    
            const handleChange = (e, section, field) => {
              const value = e.target.value;
              setDataToSend((prevData) => ({
                ...prevData,
                [section]: {
                  ...prevData[section],
                  [field]: value,
                },
              }));
          }

            const handleSubmit = async (e) => {
                e.preventDefault();
                try {
                  const response = await fetch(`${API}invoice`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                  });
                  if (response.ok) {
                    const data = await response.json();
                    console.log('Invoice created successfully:', data);
                  } else {
                    console.error('Invoice creation failed');
                  }
                } catch (error) {
                  console.error('Error creating invoice:', error);
                }
              }
    return (
        <div 
        style={{
            backgroundImage: `url(${background})`,
            minHeight: '100vh',
        }}
        >
          <AdminNavbar/>

      <h1 className='admin-create-invoice-title'>CREATE INVOICE</h1>
      <form className="admin-create-invoice-form-all" onSubmit={handleSubmit}>
      <div className='admin-create-invoice-container'>
        <div className='admin-create-invoice-data'>
      <h2 className='admin-create-invoice-subtitle'>COMPANY DETAILS</h2>
      <select
        className='admin-create-invoice-select'
          id="companyid"
          name="companyid"
          value={selectedCompany.companyid}
          onChange={handleSelectChangeCompany}
        >
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.companyname}
            </option>
          ))}
        </select>
      </div>
      <form className='admin-create-invoice-form'>
      <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="companyname"
        >Company Name</label>
        <input className='admin-create-invoice-form-input' 
        id="companyname"
        name="companyname"
        type="text"
        value={selectedCompany.companyname}
        onChange={(e) =>
          handleChange(e, "companydetails", "companyname")
        }
        />
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="companyregistrationtype"
        >Company Registration type</label>
        <input className='admin-create-invoice-form-input' 
        id="companyregistrationtype"
        name="companyregistrationtype"
        type="text"
        value={selectedCompany.companyregistrationtype}
        onChange={(e) =>
          handleChange(
            e,
            "companydetails",
            "companyregistrationtype"
          )
        }
        />
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="companygstno"
        >Company GST No.</label>
        <input className='admin-create-invoice-form-input'
            id="companygstno"
            name="companygstno"
            type="text"
            value={selectedCompany.companygstno}
            onChange={(e) =>
              handleChange(e, "companydetails", "companygstno")
            }
        />
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="companycontact"
        >Company Contact</label>
        <input className='admin-create-invoice-form-input' 
        id="companycontact"
        name="companycontact"
        type="tel"
        value={selectedCompany.companycontact}
        onChange={(e) =>
          handleChange(e, "companydetails", "companycontact")
        }
        />
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="companystate"
        >Company State</label>
        <input className='admin-create-invoice-form-input'
        id="companystate"
        name="companystate"
        type="text"
        value={selectedCompany.companystate}
        onChange={(e) =>
          handleChange(e, "companydetails", "companystate")
        }
        />
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="companyofficeaddress"
        >Company Office Address</label>
        <input className='admin-create-invoice-form-input' 
        id="companyofficeaddress"
        name="companyofficeaddress"
        type="text"
        value={selectedCompany.companyofficeaddress}
        onChange={(e) =>
          handleChange(e, "companydetails", "companyofficeaddress")
        }
        />
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="companypincode"
        >Company  pincode</label>
        <input className='admin-create-invoice-form-input' 
        id="companypincode"
        name="companypincode"
        type="text"
        value={selectedCompany.companypincode}
        onChange={(e) =>
          handleChange(e, "companydetails", "companypincode")
        }
        />
        </div>
        </form>
        <div className='admin-create-invoice-data'>
      <h2 className='admin-create-invoice-subtitle'>AGENT DETAILS</h2>
      <select className='admin-create-invoice-select'
      id="sellerid"
      name="sellerid"
      value={selectedSeller.sellerid}
      onChange={handleSelectChangeSeller}
      >
        <option value="">Select Agent</option>
        {sellers.map((seller) => (
          <option key={seller._id} value={seller._id}>
            {seller.sellerid}
          </option>
        ))}
      </select>
      </div>
      <form className='admin-create-invoice-form'>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="sellercompanyname"
        >Agent Company Name</label>
        <input className='admin-create-invoice-form-input' 
        id="sellercompanyname"
        name="sellercompanyname"
        type="text"
        value={selectedSeller.sellercompanyname}
        onChange={(e) =>
          handleChange(e, "sellerdetails", "sellercompanyname")
        }
        />
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
         htmlFor="sellercompanyaddress"
        >Agent Company Address</label>
        <input className='admin-create-invoice-form-input' 
        id="sellercompanyaddress"
        name="sellercompanyaddress"
        type="text"
        value={selectedSeller.sellercompanyaddress}
        onChange={(e) =>
          handleChange(e, "sellerdetails", "sellercompanyaddress")
        }
        />
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="sellercompanystatename"
        >Agent Company State Name</label>
        <input className='admin-create-invoice-form-input' 
        id="sellercompanystatename"
        name="sellercompanystatename"
        type="text"
        value={selectedSeller.sellercompanystatename}
        onChange={(e) =>
          handleChange(e, "sellerdetails", "sellercompanystatename")
        }
        />
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="sellercompanystatecode"
        >Agent Company State Code</label>    
        <input className='admin-create-invoice-form-input'
        id="sellercompanystatecode"
        name="sellercompanystatecode"
        type="text"
        value={selectedSeller.sellercompanystatecode}
        onChange={(e) =>
          handleChange(e, "sellerdetails", "sellercompanystatecode")
        }
        />
        </div>
        </form>
        <div className='admin-create-invoice-data'>
      <h2 className='admin-create-invoice-subtitle'>BUYER DETAILS</h2>
      <select className='admin-create-invoice-select'
      htmlFor="buyerid"
      id="buyerid"
      name="buyerid"
      value={selectedBuyer.buyerid}
      onChange={handleSelectChangeBuyer}
      >
        <option value="">Select Buyer</option>
        {buyers.map((buyer) => (
          <option key={buyer._id} value={buyer._id}>
            {buyer.buyerid}
          </option>
        ))}
      </select>
      </div>
      <form className='admin-create-invoice-form'>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="buyercompanyname"
        >Buyer Company Name</label>
        <input className='admin-create-invoice-form-input' 
        id="buyercompanyname"
        name="buyercompanyname"
        type="text"
        value={selectedBuyer.buyercompanyname}
        onChange={(e) =>
          handleChange(e, "buyerdetails", "buyercompanyname")
        }
        />
        </div>
        
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="buyercompanyaddress"
        >Buyer Company Address</label>
        <input className='admin-create-invoice-form-input' 
        id="buyercompanyaddress"
        name="buyercompanyaddress"
        type="text"
        value={selectedBuyer.buyercompanyaddress}
        onChange={(e) =>
          handleChange(e, "buyerdetails", "buyercompanyaddress")
        }
        />
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="buyercompanystatename"
        >Buyer Company State Name</label>
        <input className='admin-create-invoice-form-input'
        id="buyercompanystatename"
        name="buyercompanystatename"
        type="text"
        value={selectedBuyer.buyercompanystatename}
        onChange={(e) =>
          handleChange(e, "buyerdetails", "buyercompanystatename")
        }
        />
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="buyercompanystatecode"
        >Buyer Company State Code</label>
        <input className='admin-create-invoice-form-input' 
        id="buyercompanystatecode"
        name="buyercompanystatecode"
        type="text"
        value={selectedBuyer.buyercompanystatecode}
        onChange={(e) =>
          handleChange(e, "buyerdetails", "buyercompanystatecode")
        }
        />
        </div>
        </form>
        <div className='admin-create-invoice-data'>
      <h2 className='admin-create-invoice-subtitle'>VEHICLE DETAILS</h2>
      </div>
      <form className='admin-create-invoice-form'>
       
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="drivernumber"
        >Driver Number</label>
        <input className='admin-create-invoice-form-input'
        id="drivernumber"
        name="drivernumber"
        type="tel"
        onChange={(e) =>
          handleChange(e, "vehicledetails", "drivernumber")
        }
        />
        </div>
        
       
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="vehiclenumber"
        >Vehicle Number</label>
        <input className='admin-create-invoice-form-input' 
        id="vechiclenuumber"
        name="vechiclenuumber"
        type="text"
        onChange={(e) =>
          handleChange(e, "vehicledetails", "vechiclenuumber")
        }
        />
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="vehiclemodel"
        >Vehicle Model</label>
          <br />
        <input className='admin-create-invoice-form-input'
        id="vechiclemodel"
        name="vechiclemodel"
        type="text"
        onChange={(e) =>
          handleChange(e, "vehicledetails", "vechiclemodel")
        }
        />
          </div>
        </form>
        <div className='admin-create-invoice-data'>
      <h2 className='admin-create-invoice-subtitle'>CONSIGNMENT DETAILS</h2>
      <select
            className="admin-create-invoice-select"
            id="consignmentid"
            name="consignmentid"
            value={addedConsignment._id || ""}
            onChange={handleSelectChangeConsignment}
          >
            <option value="">Select Consignment ID</option>
            {consignments.map((consignment) => (
              <option key={consignment._id} value={consignment._id}>
                {consignment.itemname}
              </option>
            ))}
          </select>
      </div>
      <table className="admin-create-invoice-table-consigment">
          <thead className="admin-create-invoice-table-thead">
            <tr className="admin-create-invoice-table-row-head">
              <th className="admin-create-invoice-table-row-th">Item Name</th>
              <th className="admin-create-invoice-table-row-th">Item Quantity</th>
              <th className="admin-create-invoice-table-row-th">Item HSN</th>
              <th className="admin-create-invoice-table-row-th">Item Price</th>
              <th className="admin-create-invoice-table-row-th">Item Tax Rate</th>
              <th className="admin-create-invoice-table-row-th">Action</th>
            </tr>
          </thead>
          <tbody className="admin-create-invoice-table-tbody">
            <tr className="admin-create-invoice-table-row-body">
              <td className="admin-create-invoice-table-row-body-td">
                <input
                  className="admin-create-invoice-table-consigment-input"
                  type="text"
                  value={addedConsignment.itemname || ""}
                  onChange={handleConsignmentChange}
                  name="itemname"
                />
              </td>
              <td className="admin-create-invoice-table-row-body-td">
                <input
                  className="admin-create-invoice-table-consigment-input"
                  type="number"
                  value={addedConsignment.itemquantity || ""}
                  onChange={handleConsignmentChange}
                  name="itemquantity"
                />
              </td>
              <td className="admin-create-invoice-table-row-body-td">
                <input
                  className="admin-create-invoice-table-consigment-input"
                  type="text"
                  value={addedConsignment.itemhsn || ""}
                  onChange={handleConsignmentChange}
                  name="itemhsn"
                />
              </td>
              <td className="admin-create-invoice-table-row-body-td">
                <input
                  className="admin-create-invoice-table-consigment-input"
                  type="number"
                  value={addedConsignment.itemprice || ""}
                  onChange={handleConsignmentChange}
                  name="itemprice"
                />
              </td>
              <td className="admin-create-invoice-table-row-body-td">
                <input
                  className="admin-create-invoice-table-consigment-input"
                  type="number"
                  value={addedConsignment.itemtaxrate || ""}
                  onChange={handleConsignmentChange}
                  name="itemtaxrate"
                />
              </td>
              <td className="admin-create-invoice-table-row-body-td">
                <button
                  type="button"
                  className="admin-create-invoice-table-consigment-button"
                  onClick={ConsignmentsAdd}
                  disabled={
                    !addedConsignment.itemname ||
                    !addedConsignment.itemquantity ||
                    !addedConsignment.itemhsn ||
                    !addedConsignment.itemprice ||
                    !addedConsignment.itemtaxrate
                  }
                >
                   <img className='admin-create-invoice-table-consigment-icon' src={A} alt='add'/>
                </button>
              </td>
            </tr>
            <tr className="admin-create-invoice-table-row-subtitle">
              <h3 className="admin-create-invoice-subtitle-table">ADDED ITEMS</h3>
            </tr>
            {dataToSend.consignmentdetails.itemdetails.map((item, index) => (
              <tr key={index} className="admin-create-invoice-table-row-body">
                <td className="admin-create-invoice-table-consigment-value">{item.itemname}</td>
                <td className="admin-create-invoice-table-consigment-value">{item.itemquantity}</td>
                <td className="admin-create-invoice-table-consigment-value">{item.itemhsn}</td>
                <td className="admin-create-invoice-table-consigment-value">{item.itemprice}</td>
                <td className="admin-create-invoice-table-consigment-value">{item.itemtaxrate}</td>
                <td className="admin-create-invoice-table-consigment-value">
                  <button
                    className="admin-create-invoice-table-consigment-button"
                    type="button"
                    onClick={() => ConsignmentsRemove(index)}
                  >
                    <img className='admin-create-invoice-table-consigment-icon-low' src={D} alt='delete'/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      <div className='admin-create-invoice-data'>
      <h2 className='admin-create-invoice-subtitle'>INVOICE DETAILS</h2>
      </div>
      <form className='admin-create-invoice-form'>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="invoiceno"
        >Invoice Number</label>
        <input className='admin-create-invoice-form-input' 
         id="invoiceno"
         name="invoiceno"
         type="text"
         onChange={(e) =>
           handleChange(e, "invoicedetails", "invoiceno")
         }
        />
        </div>
        
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="invoicedate">
        Invoice Date</label>
        <br />
        <input className='admin-create-invoice-form-input' 
         id="invoicedate"
         name="invoicedate"
         type="date"
         onChange={(e) =>
           handleChange(e, "invoicedetails", "invoicedate")
         }
        />
        </div>
        
       
        </form>
        <div className='admin-create-invoice-data'>
      <h2 className='admin-create-invoice-subtitle'>BOARDING DETAILS</h2>
      </div>
      <form className='admin-create-invoice-form'> 
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="dateofloading"
        >Date of Loading</label>
        <input className='admin-create-invoice-form-input' 
        id="dateofloading"
        name="dateofloading"
        type="date"
        onChange={(e) =>
          handleChange(e, "boardingdetails", "dateofloading")
        }
        />
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="startingpoint"
        >Starting Point</label>
        <br />
        <input className='admin-create-invoice-form-input' 
        id="startingpoint"
        name="startingpoint"
        type="text"
        onChange={(e) =>
          handleChange(e, "boardingdetails", "startingpoint")
        }
        />
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="endingpoint"
        >Ending Point</label>
        <br />
        <input className='admin-create-invoice-form-input'
         id="endingpoint"
         name="endingpoint"
         type="text"
         onChange={(e) =>
           handleChange(e, "boardingdetails", "endingpoint")
         }
        />
        </div>
        <div className='admin-create-invoice-form-div'>
        <label className='admin-create-invoice-form-label'
        htmlFor="watermark"
        >Water Mark</label>
        <br />
        <input className='admin-create-invoice-form-input' 
         id="watermark"
         name="watermark"
         type="text"
         onChange={(e) =>
           handleChange(e, "boardingdetails", "watermark")
         }
        />
        </div>
        </form>
        <div className='admin-create-invoice-data-submit'>
      <button className='admin-create-invoice-button'>CREATE INVOICE</button>
    </div>
    
    </div>
    </form>
    </div>
  )
}

export default AdminCreateInvoice
