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
      formFields: {
        nome: "",
      },
      modalShow: false,
      weekendsVisible: true,
      showSubmit: false,
      showDelete: false,
      selectInfo: undefined,
      currentEvents: [],
    };
  }
  handleChange(e) {
    let formFields = { ...this.state.formFields };
    formFields[e.target.name] = e.target.value;
    this.setState({
      formFields,
    });
  }

  handleDateSelect = (selectInfo: DateSelectArg) => {
    this.setModalState(true);
    this.setState({
      selectInfo,
    });
  };

  formHandler = (e, formFields, selectInfo: DateSelectArg) => {
    e.preventDefault();
    let title = this.state.formFields.nome;
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
      this.setSubmitAlert(true);
      this.setModalState(false);
    }
  };

  setModalState = (state) => {
    this.setState({
      modalShow: state,
    });
  };

  handleDismiss = () => {
    this.setDeleteAlert(false);
    this.setSubmitAlert(false);
    this.setState({
      selectInfo: undefined,
    });
  };

  setSubmitAlert = (state) => {
    this.setState({
      showSubmit: state,
    });
  };

  setDeleteAlert = (state) => {
    this.setState({
      showDelete: state,
    });
  };

  //Apagar Evento

  handleEventClick = (clickInfo) => {
    if (clickInfo) {
      this.setDeleteAlert(true);
    }
    clickInfo.event.remove();
  };

  //Mostrar eventos
  handleEvents = (events) => {
    this.setState({
      currentEvents: events,
    });
  };

  render() {
    return (
      <div>
        <Alert
          variant="success"
          onClose={this.handleDismiss}
          show={this.state.showSubmit}
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
          show={this.state.showDelete}
          dismissible
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
              <h1 className="logText">Adicionar evento</h1>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Form
              method="POST"
              onSubmit={(e) =>
                this.formHandler(
                  e,
                  this.state.formFields,
                  this.state.selectInfo
                )
              }
            >
              <FormGroup>
                <Label for="SelectRecipe">
                  Escolha a receita que quer utilizar
                </Label>
                <Input
                  type="select"
                  value={this.state.formFields.nome}
                  onChange={(e) => this.handleChange(e)}
                  name="nome"
                  id="SelectRecipe"
                  required
                >
                  <option>Sardinhas na cataplana</option>
                  <option>Nem tem piada</option>
                  <option>Não gosto</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
              <Modal.Footer>
                <Button type="submit" color="success">
                  Entrar
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Fullcalendar;
