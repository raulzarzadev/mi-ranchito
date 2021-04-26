
import Button from '@cmps/Button'
import s from './styles.module.css'
	
export default function VisualGuide () {
 return (
   <div className={s.visualguide}>
     <div>
       Buttons
       <div className={s.buttons}>
         <Button>Plain</Button>
         <Button p="1">Paddin 1 </Button>
         <Button p="2">Paddin 2 </Button>
         <Button outlined>Plain</Button>
         <Button primary>Primary</Button>
         <Button secondary>Secondary</Button>
         <Button icon underline={false}>
           Icon
         </Button>
         <Button underline>underline</Button>
         <Button link underline>
           Link
         </Button>
       </div>
       <Button externalLink="true">External Link</Button>
     </div>
     <div>Text Titles</div>
     <div>Text Paragraph</div>
     <div>Colors</div>
   </div>
 )
}
