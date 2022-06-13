import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Delta } from 'quill';

@Component({
  selector: 'app-draft-preview',
  templateUrl: './draft-preview.component.html',
  styleUrls: ['./draft-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DraftPreviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Delta) { }

  ngOnInit(): void {}

}
