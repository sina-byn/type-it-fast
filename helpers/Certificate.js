// * imports
import { jsPDF } from 'jspdf';
import 'jspdf/dist/polyfills.es';

class Certificate {
    constructor(data) {
        const { name, wpm, img } = data;

        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'px'
        });
    
        const height = doc.internal.pageSize.getHeight();
        const width = doc.internal.pageSize.getWidth();
    
        doc.setFillColor('#333333').rect(0, 0, width, height, 'F');
    
        doc.setDrawColor('#ff4500').setLineWidth(1);
        doc.line(0, 20, 200, 20);
        doc.line(0, 30, 180, 30);
        doc.line(0, 40, 160, 40);
    
        doc.setTextColor('#f5f5f5');
        doc.textWithLink('type-it-fast', width - 100, 32.5, {
            url: 'https://type-it-fast.vercel.app/'
        });
        doc.setDrawColor('#f5f5f5');
        doc.line(width - 100, 36, width - 43, 36);
        doc.setFontSize(30);
        doc.text('Certificate of Completion', width / 2, height / 2, {
            align: 'center'
        });
        doc.setFontSize(20);
        doc.text('THIS IS AWARDED TO', width / 2, height / 2 + 40, {
            align: 'center',
        });
        doc.setFontSize(35);
        doc.setTextColor('#ff4500');
        doc.text(name, width / 2, height / 2 + 80, {
            align: 'center'
        });
        doc.setFontSize(18);
        doc.setTextColor('#f5f5f5');
        doc.text(`for completing the typing speed test with a score of ${wpm}wpm`, width / 2, height / 2 + 115, {
            align: 'center'
        });

        doc.addImage(img, width / 2 - 50, height / 2 - 150, 100, 100);

        doc.setDrawColor('#ff4500')
        doc.line(width - 200, height - 20, 200, height - 20);
        doc.line(width - 180, height - 30, 180, height - 30);
        doc.line(width - 160, height - 40, 160, height - 40);
    
        this.doc = doc;
    }

    downlaod() {
        this.doc.save('certificate.pdf');
    }
}

export default Certificate;