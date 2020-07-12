import React from "react";
import FullCalendar, { DateSelectArg } from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptLocale from "@fullcalendar/core/locales/pt";
import "bootstrap/dist/css/bootstrap.css";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import "@fortawesome/fontawesome-free/css/all.css";
import listPlugin from "@fullcalendar/list";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import { Alert, Button, Modal } from "react-bootstrap";
import { Form, FormGroup, Input, Label } from "reactstrap";

class Fullcalendar extends React.Component {
  constructor() {
    super();
    this.state = {
      modalShow: false,
      weekendsVisible: true,
      show2: false,
      show: false,
      formField: {
        title: "",
      },

      currentEvents: [],
    };
  }

  inputChangeHandler = (e) => {
    let formField = { ...this.state.formField };
    formField[e.target.name] = e.target.value;
    this.setState({
      formField,
    });
  };

  handleDateSelect = (selectInfo: DateSelectArg) => {
    this.setModalState(true);
    console.log(selectInfo);
  };

  formHandler = (formField, selectInfo: DateSelectArg) => {
    let title = this.state.formField.title;
    console.log(title);
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      console.log(title);
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
      this.setAlert2State(true);
    }
  };

  setModalState = (state) => {
    this.setState({
      modalShow: state,
      formField: {
        title: "",
      },
    });
  };

  handleDismiss = () => {
    console.log("okok");
    this.setAlertState(false);
    this.setAlert2State(false);
  };
  setAlert2State = (state) => {
    this.setState({
      show2: state,
    });
  };
  setAlertState = (state) => {
    this.setState({
      show: state,
    });
  };

  handleEventClick = (clickInfo) => {
    if (clickInfo) {
      this.setAlertState(true);
    }
    clickInfo.event.remove();
  };

  handleDateSelect = () => {
    this.setModalState(true);
  };

  handleEvents = (events) => {
    this.setState({
      currentEvents: events,
    });
  };

  render() {
    let selectInfo;

    return (
      <div>
        <Alert
          variant="success"
          onClose={this.handleDismiss}
          show={this.state.show2}
          dismissible
        >
          <Alert.Heading>Evento adicionado com sucesso</Alert.Heading>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={this.handleDismiss} variant="outline-success">
              Fechar
            </Button>
          </div>
        </Alert>

        <Alert
          variant="danger"
          onClose={this.handleDismiss}
          show={this.state.show}
          dismissible
          autohide
        >
          <Alert.Heading>Evento apagado com sucesso</Alert.Heading>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={this.handleDismiss} variant="outline-danger">
              Fechar
            </Button>
          </div>
        </Alert>
        <FullCalendar
          locale={ptLocale}
          editable={true}
          headerToolbar={{
            left: "",
            center: "title",
            right: "prev,next today",
          }}
          initialEvents={INITIAL_EVENTS}
          select={this.handleDateSelect}
          eventClick={this.handleEventClick}
          eventsSet={this.handleEvents}
          schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
          initialView="dayGridMonth"
          themeSystem="bootstrap"
          selectMirror={true}
          dayMaxEvents={true}
          eventAdd={this.formHandler}
          selectable={true}
          droppable={true}
          plugins={[
            listPlugin,
            bootstrapPlugin,
            resourceTimelinePlugin,
            dayGridPlugin,
            interactionPlugin,
          ]}
        />
        <Modal
          show={this.state.modalShow}
          onHide={() => this.setModalState(false)}
          centered
        >
          <Modal.Header closeButton>
            <div>
              <h1 className="logText">Entre na sua conta</h1>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Form
              method="POST"
              onSubmit={(e) =>
                this.formHandler(e, this.state.formField, selectInfo)
              }
            >
              <FormGroup>
                <Label for="title">Nome da receita</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  onChange={(e) => this.inputChangeHandler(e)}
                  value={this.state.formField.title}
                  required
                />
              </FormGroup>
              <Button type="submit" color="success">
                Entrar
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Fullcalendar;
