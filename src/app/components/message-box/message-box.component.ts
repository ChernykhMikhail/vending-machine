import { Component, OnInit, Input  } from '@angular/core';

import { MessageCode } from '../../service/MessageCode';
import { MessageBoxService } from '../../service/message-box.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
  message = 'Default message text';
  messages: string[];
  isShowMessage = false;
  code: MessageCode;

  constructor( private messageBoxService: MessageBoxService ) {
  }

  ngOnInit() {
  }

  showMessageBox(code: MessageCode): void {
    this.messages = this.messageBoxService.getMessages();
    if (code === MessageCode.SUCCESS) {
      this.message = this.messages[0];
      this.code = MessageCode.SUCCESS;
    } else if (code === MessageCode.FAIL) {
      this.message = this.messages[1];
      this.code = MessageCode.FAIL;
    } else {
      this.message = this.messages[2];
      this.code = MessageCode.ERROR;
    }
    this.isShowMessage = true;
    window.setTimeout( () => this.isShowMessage = false, 2000);
  }

}
