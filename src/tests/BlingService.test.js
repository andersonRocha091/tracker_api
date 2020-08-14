const assert = require("assert");
const { v4: uuidv4 } = require("uuid");

const BlingService = require("../services/BlingService");

const MOCK_XML_ORDER_CREATE = `<?xml version="1.0"?><pedido><cliente><nome>Sergio Fernandes</nome></cliente><itens><item><codigo>1</codigo><vlr_unit>200</vlr_unit></item></itens></pedido>`;

describe("Testing bling integration routines", function () {
  this.beforeAll(() => {
    blingService = new BlingService();
  });

  it("Generating xml to be sent in a request", () => {
    const xmlString = blingService.createXml(200, "Sergio Fernandes", "1");
    assert.equal(xmlString, MOCK_XML_ORDER_CREATE);
  });

  it("Must fail because of diferent type on creating xml", () => {
    const xmlString = blingService.createXml(200, "Sergio Fernandes", "3");
    assert.notEqual(xmlString, MOCK_XML_ORDER_CREATE);
  });

  it("Sending request to register an order into bling account", async () => {
    const xmlString = blingService.createXml(200, "Sergio Fernandes", uuidv4());
    const { result } = await blingService.sendRergisterRevenueRequest(
      xmlString
    );
    assert.ok(result.retorno.pedidos);
  });
});
