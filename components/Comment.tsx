import React from 'react'
import Button from './Button';
import { formatDate } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

interface CommentProps{
    comment: CommentType;
    action: () => void;
    
}


const Comment:React.FC<CommentProps> = ({comment, action}) => {
  return (
    <div className='flex justify-between border-2 border-slate-200 my-3 rounded-md py-2 px-3'>
        <div className='flex flex-col'>
            <p>{comment.userId}</p>
            <p className='text-sm text-slate-300'>{formatDate(comment.createdAt)}</p>
            <p>
                {comment.text}  
            </p>            
        </div>
        {/* <span key={comment.id} > */}
            <Button  label="Delete" icon={Trash2}  actionButton={action} />             
                 
        {/* </span> */}

    </div>
  )
  

}

export default Comment