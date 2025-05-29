import React from 'react';
import './HumanBody.css'; // For positioning overlays

export default function HumanBody() {
  return (
    <div className="body-container position-relative">
      <img
        src="human-body.jpg"
        alt="Human Body"
        style={{ width: '100%', maxWidth: '400px' }}
      />

      <div className="marker" style={{ top: '14px', left: '140px' }}>
        <i className="fas fa-brain text-danger fa-1x"></i>
         <span class="hover-text">Headache</span>
      </div>

     <div className="marker" style={{ top: '60px', left: '110px' }}>
  <i className="fas fa-lungs text-primary fa-3x"></i>
 <span class="hover-text">Chest Pain</span>
</div>

    </div>
  );
}
