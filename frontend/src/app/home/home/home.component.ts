import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserSelectorService} from '../../state/selectors/user-selector.service';
import {select, Store} from '@ngrx/store';
import {UserDataState} from '../../state/user-data.state';
import {LoadUserData} from '../../state/user.actions';
import * as _ from 'lodash';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Logout} from '../../auth/state/auth.actions';
import {UserService} from '../../auth/user.service';
import {NavigateTo} from '../../state/navigation.actions';
import {AuthService} from '../../auth/auth.service';

class TreeNode {
  constructor(public name: string, public open?: boolean, public children?: TreeNode[]) {
    this.open = true;
  }

  passFilter(filterStr: string): boolean {
    return !filterStr
      || this.name.indexOf(filterStr) > -1
      || (this.children && this.findInArr(this.children, filterStr));
  }

  findInArr(arr: any[], str: string): boolean {
    for (const e of arr) {
      if (this.find(e, str)) {
        return true;
      }
    }
    return false;
  }

  find(obj: any, str: string): boolean {
    if (obj.name.indexOf(str) > -1) {
      return true;
    }
    if (obj.children && obj.children.length) {
      return this.findInArr(obj.children, str);
    }
    return false;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  msg: string;
  filter: string;
  adjW = _.debounce(this.adjustTableWidth);
  private hideTreePanel = true;

  @ViewChild('containerElt') containerElt: ElementRef;
  @ViewChild('sidebarElt') sidebarElt: ElementRef;
  @ViewChild('treeElt') treeElt: ElementRef;
  @ViewChild('tableElt') tableElt: ElementRef;

  sampleJson: TreeNode[] = [
    new TreeNode('fruit', false, [
      new TreeNode('apples', false, [
        new TreeNode('McIntosh'),
        new TreeNode('Golden Delicious'),
        new TreeNode('Fuji'),
        new TreeNode('Cortland'),
        new TreeNode('Red Delicious')
      ]),
      new TreeNode('peaches', false, [
        new TreeNode('White Peach'),
        new TreeNode('Yellow Peach'),
        new TreeNode('Nectarine'),
        new TreeNode('Donut Peach')
      ])
    ]), new TreeNode('vegetables', false, [
      new TreeNode('tomatoes', false, [
        new TreeNode('Cherry Tomatoes'),
        new TreeNode('Red Beefsteak Tomatoes'),
        new TreeNode('Grape Tomatoes'),
        new TreeNode('Green Beefsteak Tomatoes')
      ]),
      new TreeNode('cucumber', false, [
        new TreeNode('Lemon'),
        new TreeNode('Persian'),
        new TreeNode('Hothouse')
      ])
    ])
  ];

  // sampleJson: any = [{
  //   name: 'fruit',
  //   children: [
  //     {
  //       name: 'apples',
  //       children: [
  //         {name: 'McIntosh'},
  //         {name: 'Golden Delicious'},
  //         {name: 'Fuji'},
  //         {name: 'Cortland'},
  //         {name: 'Red Delicious'}
  //       ]
  //     },
  //     {
  //       name: 'peaches',
  //       children: [
  //         {name: 'White Peach'},
  //         {name: 'Yellow Peach'},
  //         {name: 'Nectarine'},
  //         {name: 'Donut Peach'}
  //       ]
  //     }
  //   ]
  // }, {
  //   name: 'vegetables',
  //   children: [
  //     {
  //       name: 'tomatoes',
  //       children: [
  //         {name: 'Cherry Tomatoes'},
  //         {name: 'Red Beefsteak Tomatoes'},
  //         {name: 'Grape Tomatoes'},
  //         {name: 'Green Beefsteak Tomatoes'},
  //       ]
  //     }, {
  //       name: 'cucumber',
  //       children: [
  //         {name: 'Lemon'},
  //         {name: 'Persian'},
  //         {name: 'Hothouse'},
  //       ]
  //     }
  //   ]
  // }];

  constructor(private router: Router, public usrSvc: UserService,
              private svc: UserSelectorService, private store: Store<UserDataState>,
              private authSvc: AuthService) {
    this.store.dispatch(new LoadUserData());
    this.store.pipe(select(this.svc.getUserData()))
      .subscribe(m => this.msg = _.get(m, 'data'),
        (e: HttpErrorResponse) => {
          if (e.status === 401) {
            router.navigateByUrl('/login', {
              queryParams: {
                error: 'Unauthorized Access!'
              }
            });
          }
          console.error(`Error getting name: ${JSON.stringify(e)}`);
          this.msg = null;
        });
  }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(new Logout());
    return false;
  }

  goto(uri: string) {
    this.store.dispatch(new NavigateTo({path: uri}));
    return false;
  }

  get userId(): string {
    return _.get(this.usrSvc, 'currentUser.userId');
  }

  isUriAllowed(uri: string): boolean {
    return this.authSvc.isUriAllowed(uri);
  }

  hasChildren(item: any): boolean {
    return _.get(item, 'children.length', false);
  }

  clicked(item: any) {
    item.open = !item.open;
    this.adjW();
  }

  adjustTableWidth() {
    const w = _.get(this.containerElt, 'nativeElement.clientWidth', 0)
      - _.get(this.treeElt, 'nativeElement.clientWidth', 0)
      - _.get(this.sidebarElt, 'nativeElement.clientWidth', 20) - 20;
    this.tableElt.nativeElement.style.width = `${w}px`;
    console.log(`tableElt: ${this.tableElt.nativeElement.clientWidth} vs ${w}`);
  }

  ngAfterViewInit(): void {
    this.adjW();
  }

  set hideTree(v) {
    this.hideTreePanel = v;
    this.adjW();
  }

  get hideTree() {
    return this.hideTreePanel;
  }

  flatten(arr: any[], res: any[]) {
    for (const e of arr) {
      if (_.get(e, 'children.length')) {
        for (const c of e.children) {
          c.parent = e.name;
        }
        this.flatten(e.children, res);
      }
      res.push(e);
    }
  }

  filterArr(arr: TreeNode[]): TreeNode[] {
    return arr.filter(tn => tn.passFilter(this.filter));
  }

  filterChanged(event: KeyboardEvent) {
    console.log(`filterChanged: ${this.filter}`);
  }
}
