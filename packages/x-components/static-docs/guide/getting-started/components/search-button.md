import { NextItem } from '@docusaurus/react-components/Utils';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { ReactSearchButton, ReactSearchInput, doMagic } from '@docusaurus/react-components/ReactComponents';

Search button component which emits on its click
[UserAcceptedAQuery](../../x-components.xeventstypes.useracceptedaquery) and
[UserAcceptedAQuery](../../x-components.searchboxxevents.userpressedsearchbutton)
events with the query as payload while there is query.
If the query is empty, the component won't emit any event. The component has also a
dynamic class to flag the HTML button when the query is empty (to hide the button when the
query is empty for instance).

  ## Usage

<Tabs
  defaultValue="vue"
  values={[
    {label: 'Vue', value: 'vue'},
    {label: 'Live', value: 'live'},
  ]}>
  <TabItem value="vue">

  ```jsx
  <SearchButton />
  ```

  </TabItem>
  <TabItem value="live">

<ReactSearchButton> Search </ReactSearchButton>

  </TabItem>
</Tabs>

 ## Overriding slot

  If you need to add custom content inside this component. You only need to pass a new
  component in the default slot:

<Tabs
  defaultValue="vue"
  values={[
    {label: 'Vue', value: 'vue'},
    {label: 'Live', value: 'live'},
  ]}>
  <TabItem value="vue">

  ```jsx
<SearchButton>
    <img src="./my-awesome-clear-icon.svg" />
</SearchButton>
  ```

  </TabItem>
  <TabItem value="live">
   <ReactSearchButton><img style={{height:'16px',margin:'0',border:'0'}}
   src="https://image.flaticon.com/icons/svg/483/483356.svg" /></ReactSearchButton>
  </TabItem>
</Tabs>

## Using the events

:::info
There is a list of events that can be emitted. [XEvents](../../x-components.xeventstypes)
:::

Exist the possibility of call methods to do something when an event is emitted:

<Tabs
  defaultValue="vue"
  values={[
    {label: 'Vue', value: 'vue'},
    {label: 'Live', value: 'live'},
  ]}>
  <TabItem value="vue">

  ```jsx
<SearchButton @UserPressedSearchButton="doMagic()" />
  ```

  </TabItem>
   <TabItem value="live">
     <ReactSearchButton on={ {UserPressedSearchButton: doMagic} }> Search </ReactSearchButton>
    </TabItem>
</Tabs>


## Up next

Ready for more? Continue reading with:

<NextItem color="#e77962" font="white" next="query-suggestions">Query Suggestions</NextItem>
