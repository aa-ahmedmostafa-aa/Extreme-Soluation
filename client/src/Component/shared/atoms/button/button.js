import classNames from "classnames";
import styles from './button.module.css'

const Button = ({children,onClick,radias ,icon}) => {
    const rounded=classNames([styles['btnStyle']],{
        [styles['sm']]:radias==='sm',
        [styles['md']]:radias==='md',
    })
    return (
  
        <button  onClick={onClick} className={rounded}>
            {children}
          { icon&& <i className={icon + " ml-1"}> </i>}
        </button>
   );
}
 
export default Button;