import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./App.css"

const App = () => {
  const [name, setName] = useState("");

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "px", format: "a4", precision: 100 });
  
    const content = document.getElementById("content");
    html2canvas(content).then((canvas) => {
      // Create a new canvas with reduced dimensions
      const newCanvas = document.createElement("canvas");
      const newContext = newCanvas.getContext("2d");
      
      // Set the new canvas dimensions (adjust these values as needed)
      const newWidth = canvas.width * 0.6; // Reduce width by 50%
      const newHeight = canvas.height * 0.6; // Reduce height by 50%
      newCanvas.width = newWidth;
      newCanvas.height = newHeight;
  
      // Draw the original canvas onto the new canvas with the reduced dimensions
      newContext.drawImage(canvas, 0, 0, newWidth, newHeight);
  
      // Convert the new canvas to a data URL
      const imgData = newCanvas.toDataURL("image/png",1.0);
  
      // Add the reduced-size image to the PDF
      // doc.addImage(imgData, "JPEG", 0, 0);
      doc.addImage(imgData, "JPEG", 30, 30);
  
      // Save the PDF
      doc.save("certificate.pdf");
    });
  };
  

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={generatePDF}>Download</button>

      <div id="content">
        <div class="container pm-certificate-container">
          <div class="outer-border"></div>
          <div class="inner-border"></div>

          <div class="pm-certificate-border col-xs-12 ">
            <div class="row pm-certificate-header">
              <div class="pm-certificate-title cursive col-xs-12 text-center">
                <h2>Fiitjee World School Certificate of Completion</h2>
              </div>
            </div>

            <div class="row pm-certificate-body">
              <div class="pm-certificate-block">
                <div class="col-xs-12">
                  <div class="row">
                    <div class="col-xs-2"></div>
                    <div class="pm-certificate-name underline margin-0 col-xs-8 text-center">
                      <span class="pm-name-text bold">
                        {name}
                      </span>
                    </div>
                    <div class="col-xs-2"></div>
                  </div>
                </div>

                <div class="col-xs-12">
                  <div class="row">
                    <div class="col-xs-2"></div>
                    <div class="pm-earned col-xs-8 text-center">
                      <span class="pm-earned-text padding-0 block cursive">
                        has earned
                      </span>
                      <span class="pm-credits-text block bold sans">
                        PD175: 1.0 Credit Hours
                      </span>
                    </div>
                    <div class="col-xs-2"></div>
                    <div class="col-xs-12"></div>
                  </div>
                </div>

                <div class="col-xs-12">
                  <div class="row">
                    <div class="col-xs-2"></div>
                    <div class="pm-course-title col-xs-8 text-center">
                      <span class="pm-earned-text block cursive">
                        while completing the training course entitled
                      </span>
                    </div>
                    <div class="col-xs-2"></div>
                  </div>
                </div>

                <div class="col-xs-12">
                  <div class="row">
                    <div class="col-xs-2"></div>
                    <div class="pm-course-title underline col-xs-8 text-center">
                      <span class="pm-credits-text block bold sans">
                        BPS PGS Initial PLO for Principals at Cluster Meetings
                      </span>
                    </div>
                    <div class="col-xs-2"></div>
                  </div>
                </div>
              </div>

              <div class="col-xs-12">
                <div class="row">
                  <div class="pm-certificate-footer">
                    <div class="col-xs-4 pm-certified col-xs-4 text-center">
                      <span class="pm-credits-text block sans">
                        Buffalo City School District
                      </span>
                      <span class="pm-empty-space block underline"></span>
                      <span class="bold block">
                        Crystal Benton Instructional Specialist II, Staff
                        Development
                      </span>
                    </div>
                    <div class="col-xs-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
